<template>
	<div class="-mt-8 flex h-[calc(100vh-70px-2.5rem)] flex-col">
		<div class="flex-1 overflow-y-auto pt-8">
			<div class="relative mx-auto flex w-full max-w-[900px] flex-col">
				<div class="flex flex-col gap-8 pb-5">
					<div
						v-for="category in categoriesWithSkills"
						:key="category.id"
						class="flex flex-col gap-4"
					>
						<h3 class="text-m font-light text-white">{{ category.name }}</h3>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							<ButtonsProgressButton
								v-for="skill in getSkillsByCategory(category.id)"
								:key="skill.name"
								:progress="getSkillButtonProps(skill).progress"
								:class="getSkillButtonProps(skill).class"
								variant="text"
								color="secondary"
								@click="handleSkillClick(skill)"
							>
								{{ skill.name }}
							</ButtonsProgressButton>
						</div>
					</div>
				</div>

				<div class="sticky bottom-0 bg-dark-1 py-2">
					<div class="flex justify-end gap-4 px-2">
						<template v-if="!isRemovalMode">
							<BaseButton
								class="max-w-[220px]"
								variant="text"
								color="secondary"
								@click="handleAddSkill"
							>
								<div class="flex items-center justify-center gap-3">
									<PlusIcon color="var(--color-gray-7)" width="24" />
									ADD SKILL
								</div>
							</BaseButton>
							<BaseButton
								v-if="skills.length > 0"
								class="max-w-[220px]"
								variant="text"
								color="primary"
								@click="isRemovalMode = true"
							>
								<div class="flex items-center justify-center gap-3">
									<TrashBin color="var(--color-red-1)" width="24" />
									REMOVE SKILLS
								</div>
							</BaseButton>
						</template>
						<template v-else>
							<BaseButton
								class="max-w-[220px]"
								variant="outlined"
								color="secondary"
								@click="handleCancelRemoval"
							>
								CANCEL
							</BaseButton>
							<BaseButton
								class="max-w-[220px]"
								variant="contained"
								color="primary"
								:disabled="
									selectedSkillsToRemove.size === 0 || isDeletingSkills
								"
								@click="handleDeleteSkills"
							>
								<div class="flex items-center justify-center gap-3">
									DELETE
									<div class="w-2">{{ selectedSkillsToRemove.size }}</div>
								</div>
							</BaseButton>
						</template>
					</div>
				</div>
			</div>
		</div>

		<BaseModal
			v-model:is-open="isUpdateSkillModalOpen"
			title="Update Skill"
			confirm-text="CONFIRM"
			:has-changes="hasChanges"
			@confirm="handleUpdateSkillConfirm"
		>
			<BaseDropdown
				id="skill-name"
				v-model="selectedSkillOption"
				label="Skill"
				:options="[
					{
						value: selectedSkill?.name ?? '',
						label: selectedSkill?.name ?? '',
					},
				]"
				disabled
			/>
			<BaseDropdown
				id="skill-level"
				v-model="selectedLevelOption"
				label="Skill Level"
				:options="skillLevelOptions"
			/>
		</BaseModal>
		<BaseModal
			v-model:is-open="isAddSkillModalOpen"
			title="Add Skill"
			confirm-text="ADD"
			:has-changes="!!(newSelectedSkill && newSelectedLevel)"
			@confirm="handleAddSkillConfirm"
		>
			<BaseDropdown
				id="new-skill-name"
				v-model="newSkillOption"
				label="Skill"
				:options="skillOptions"
			/>
			<BaseDropdown
				id="new-skill-level"
				v-model="newLevelOption"
				label="Skill Level"
				:options="skillLevelOptions"
			/>
		</BaseModal>
	</div>
</template>

<script setup lang="ts">
	import PlusIcon from '~/components/icons/PlusIcon.vue';
	import TrashBin from '~/components/icons/TrashBin.vue';
	import {
		addProfileSkill,
		deleteProfileSkill,
		getAllSkills,
		getProfileSkills,
		getSkillCategories,
		updateProfileSkill,
	} from '~/services/user';
	import { showErrorToast, showSuccessToast } from '~/utils/toast/toast';

	definePageMeta({
		layout: 'user-profile',
	});

	interface Skill {
		name: string;
		categoryId: string;
		mastery: 'Novice' | 'Advanced' | 'Competent' | 'Proficient' | 'Expert';
	}

	interface SkillDefault {
		id: string;
		name: string;
		category: {
			id: string;
			order: number;
		};
		category_name: string;
		category_parent_name: string;
	}

	interface SkillCategory {
		id: string;
		name: string;
		parent: {
			id: string;
			name: string;
		} | null;
	}

	const skillLevelToProgress: Record<Skill['mastery'], number> = {
		Novice: 20,
		Advanced: 40,
		Competent: 60,
		Proficient: 80,
		Expert: 100,
	};
	const categories = ref<SkillCategory[]>([]);
	const skills = ref<Skill[]>([]);

	const route = useRoute();
	const userId = ref(route.params.id as string);

	const skillsDataKey = `skills-${userId.value}`;
	const categoriesDataKey = 'skill-categories';
	const allSkillsDataKey = 'all-skills';

	const { data: skillsData } = useNuxtData(skillsDataKey);
	const { data: categoriesData } = useNuxtData(categoriesDataKey);
	const { data: allSkillsData } = useNuxtData(allSkillsDataKey);

	const isAddSkillModalOpen = ref(false);
	const allSkills = ref<SkillDefault[]>([]);
	const newSelectedSkill = ref<SkillDefault | null>(null);
	const newSelectedLevel = ref<Skill['mastery'] | null>(null);

	if (!skillsData.value) {
		const { data } = await useAsyncData(skillsDataKey, () =>
			getProfileSkills(userId.value)
		);
		skillsData.value = data.value;
	}

	if (!categoriesData.value) {
		const { data } = await useAsyncData(categoriesDataKey, () =>
			getSkillCategories()
		);
		categoriesData.value = data.value;
	}

	if (!allSkillsData.value) {
		const { data } = await useAsyncData(allSkillsDataKey, () => getAllSkills());
		allSkillsData.value = data.value;
	}

	watch(
		() => categoriesData.value?.categories,
		(newCategories) => {
			if (newCategories) {
				categories.value = newCategories;
			}
		},
		{ immediate: true }
	);

	watch(
		() => skillsData.value?.skills,
		(newSkills) => {
			if (newSkills) {
				skills.value = newSkills;
			}
		},
		{ immediate: true }
	);

	watch(
		() => allSkillsData.value?.skills,
		(newSkills) => {
			if (newSkills) {
				allSkills.value = newSkills;
			}
		},
		{ immediate: true }
	);

	const categoriesWithSkills = computed(() => {
		return categories.value.filter((category) =>
			skills.value.some((skill) => skill.categoryId === category.id)
		);
	});

	const getSkillProgress = (mastery: Skill['mastery']) => {
		return skillLevelToProgress[mastery];
	};

	const getSkillsByCategory = (categoryId: string) => {
		return skills.value.filter((skill) => skill.categoryId === categoryId);
	};

	const newSkillOption = computed({
		get: () => ({
			value: newSelectedSkill.value?.id ?? '',
			label: newSelectedSkill.value?.name ?? '',
		}),
		set: (option) => {
			newSelectedSkill.value =
				allSkills.value.find((skill) => skill.id === option.value) ?? null;
		},
	});

	const newLevelOption = computed({
		get: () => ({
			value: newSelectedLevel.value ?? '',
			label: newSelectedLevel.value ?? '',
		}),
		set: (option) => {
			newSelectedLevel.value = option.value as Skill['mastery'];
		},
	});

	const skillOptions = computed(() => {
		const availableSkills = allSkills.value.filter(
			(skill) =>
				!skills.value.some((userSkill) => userSkill.name === skill.name)
		);

		const groupedSkills = availableSkills.reduce(
			(acc, skill) => {
				const category = skill.category_name;
				if (!acc[category]) {
					acc[category] = [];
				}
				acc[category].push(skill);
				return acc;
			},
			{} as Record<string, SkillDefault[]>
		);

		return Object.entries(groupedSkills).flatMap(([category, skills]) => [
			{ value: category, label: category, disabled: true, isSeparator: true },
			...skills.map((skill) => ({
				value: skill.id,
				label: skill.name,
			})),
		]);
	});

	const handleAddSkill = () => {
		newSelectedSkill.value = null;
		newSelectedLevel.value = null;
		isAddSkillModalOpen.value = true;
	};

	const handleAddSkillConfirm = async () => {
		if (!newSelectedSkill.value || !newSelectedLevel.value) return;

		const newSkill = {
			name: newSelectedSkill.value.name,
			categoryId: newSelectedSkill.value.category.id,
			mastery: newSelectedLevel.value,
		};

		try {
			const { executeAdd } = addProfileSkill({
				userId: userId.value,
				name: newSelectedSkill.value.name,
				categoryId: newSelectedSkill.value.category.id,
				mastery: newSelectedLevel.value,
			});

			await executeAdd();
			clearNuxtData(skillsDataKey);
			skills.value = [...skills.value, newSkill];

			showSuccessToast('Skill added successfully');
			isAddSkillModalOpen.value = false;
		} catch (error) {
			showErrorToast('Error adding skill');
			console.error('Error adding skill:', error);
		}
	};

	const isUpdateSkillModalOpen = ref(false);
	const selectedSkill = ref<Skill | null>(null);
	const selectedSkillOption = computed({
		get: () => ({
			value: selectedSkill.value?.name ?? '',
			label: selectedSkill.value?.name ?? '',
		}),
		set: () => {},
	});

	const initialLevel = ref<Skill['mastery'] | null>(null);
	const selectedLevel = ref<Skill['mastery'] | null>(null);
	const selectedLevelOption = computed({
		get: () => ({
			value: selectedLevel.value ?? '',
			label: selectedLevel.value ?? '',
		}),
		set: (option) => {
			selectedLevel.value = option.value as Skill['mastery'];
		},
	});
	const skillLevelOptions = [
		{ value: 'Novice', label: 'Novice' },
		{ value: 'Advanced', label: 'Advanced' },
		{ value: 'Competent', label: 'Competent' },
		{ value: 'Proficient', label: 'Proficient' },
		{ value: 'Expert', label: 'Expert' },
	];

	const isRemovalMode = ref(false);
	const isDeletingSkills = ref(false);
	const selectedSkillsToRemove = ref<Set<string>>(new Set());

	const hasChanges = computed(() => selectedLevel.value !== initialLevel.value);

	const handleSkillClick = (skill: Skill) => {
		if (isRemovalMode.value) {
			const skillName = skill.name;
			if (selectedSkillsToRemove.value.has(skillName)) {
				selectedSkillsToRemove.value.delete(skillName);
			} else {
				selectedSkillsToRemove.value.add(skillName);
			}
			return;
		}
		selectedSkill.value = skill;
		selectedLevel.value = skill.mastery;
		initialLevel.value = skill.mastery;

		isUpdateSkillModalOpen.value = true;
	};

	const handleUpdateSkillConfirm = async () => {
		if (!selectedSkill.value || !selectedLevel.value) return;

		try {
			const { executeUpdate } = updateProfileSkill({
				userId: userId.value,
				name: selectedSkill.value.name,
				categoryId: selectedSkill.value.categoryId,
				mastery: selectedLevel.value,
			});

			await executeUpdate();
			clearNuxtData(skillsDataKey);

			skills.value = skills.value.map((skill) =>
				skill.name === selectedSkill.value?.name
					? { ...skill, mastery: selectedLevel.value! }
					: skill
			);
			showSuccessToast('Skill updated successfully');
		} catch (error) {
			showErrorToast('Error updating skill');
			console.error('Error updating skill:', error);
		}
	};

	const handleCancelRemoval = () => {
		isRemovalMode.value = false;
		selectedSkillsToRemove.value.clear();
	};

	const handleDeleteSkills = async () => {
		isDeletingSkills.value = true;
		try {
			const { executeDelete } = deleteProfileSkill(
				userId.value,
				Array.from(selectedSkillsToRemove.value)
			);
			await executeDelete();
			clearNuxtData(skillsDataKey);

			skills.value = skills.value.filter(
				(skill) => !selectedSkillsToRemove.value.has(skill.name)
			);
			showSuccessToast('Skills deleted successfully');
			handleCancelRemoval();
		} catch (error) {
			showErrorToast('Error deleting skills');
			console.error('Error deleting skills:', error);
		} finally {
			isDeletingSkills.value = false;
		}
	};

	const getSkillButtonProps = (skill: Skill) => {
		if (isRemovalMode.value) {
			const isSelected = selectedSkillsToRemove.value.has(skill.name);
			return {
				progress: isSelected ? 0 : getSkillProgress(skill.mastery),
				class: isSelected ? 'text-white' : '',
			};
		}
		return {
			progress: getSkillProgress(skill.mastery),
			class: '',
		};
	};
</script>
