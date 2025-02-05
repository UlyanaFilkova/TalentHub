<template>
	<div class="-mt-8 flex h-[calc(100vh-70px-2.5rem)] flex-col">
		<div class="flex-1 overflow-y-auto pt-8">
			<div v-if="isLoading" class="flex flex-col items-center gap-16">
				Loading
			</div>
			<div v-else class="mx-auto flex w-full max-w-[900px] flex-col gap-8">
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
		</div>
		<div class="mx-auto flex w-full max-w-[900px] justify-end gap-4 px-2">
			<template v-if="!isRemovalMode">
				<BaseButton
					class="max-w-[220px]"
					variant="text"
					color="secondary"
					@click="handleAddSkill"
				>
					<div class="flex items-center justify-center gap-3">
						<PlusIcon
							color="var(--color-button-secondary-text-text)"
							width="24"
						/>
						ADD SKILL
					</div>
				</BaseButton>
				<BaseButton
					class="max-w-[220px]"
					variant="text"
					color="primary"
					@click="handleRemoveSkill"
				>
					<div class="flex items-center justify-center gap-3">
						<TrashBin color="var(--color-accent-color)" width="24" />
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
					:disabled="selectedSkillsToRemove.size === 0"
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
</template>

<script setup lang="ts">
	import {
		addProfileSkill,
		deleteProfileSkill,
		getAllSkills,
		getProfileSkills,
		getSkillCategories,
		updateProfileSkill,
	} from '~/utils/services/user-service';

	import PlusIcon from '~/components/icons/PlusIcon.vue';
	import TrashBin from '~/components/icons/TrashBin.vue';

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

	const route = useRoute();
	const userId = ref(route.params.id as string);

	const categories = ref<SkillCategory[]>([]);
	const skills = ref<Skill[]>([]);
	const isLoading = ref(true);
	const refetchSkills = ref();

	const categoriesWithSkills = computed(() => {
		return categories.value.filter((category) =>
			skills.value.some((skill) => skill.categoryId === category.id)
		);
	});

	const getSkillProgress = (mastery: Skill['mastery']) => {
		return skillLevelToProgress[mastery];
	};

	onMounted(async () => {
		const { skills: fetchedAllSkills, loading: allSkillsLoading } =
			getAllSkills();

		const { categories: fetchedCategories, loading: categoriesLoading } =
			getSkillCategories();
		const {
			skills: fetchedSkills,
			loading: skillsLoading,
			refetch,
		} = getProfileSkills(userId.value);

		refetchSkills.value = refetch;

		watchEffect(() => {
			isLoading.value = categoriesLoading.value || skillsLoading.value;
		});

		watch(
			fetchedCategories,
			(newCategories) => {
				if (newCategories) {
					categories.value = newCategories;
				}
			},
			{ immediate: true }
		);

		watch(
			fetchedSkills,
			(newSkills) => {
				if (newSkills) {
					skills.value = newSkills;
				}
			},
			{ immediate: true }
		);

		watch(
			fetchedAllSkills,
			(newSkills) => {
				if (newSkills) {
					allSkills.value = newSkills;
				}
			},
			{ immediate: true }
		);
	});

	const getSkillsByCategory = (categoryId: string) => {
		return skills.value.filter((skill) => skill.categoryId === categoryId);
	};

	const isAddSkillModalOpen = ref(false);
	const allSkills = ref<SkillDefault[]>([]);
	const newSelectedSkill = ref<SkillDefault | null>(null);
	const newSelectedLevel = ref<Skill['mastery'] | null>(null);

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

		try {
			const { executeAdd } = addProfileSkill({
				userId: userId.value,
				name: newSelectedSkill.value.name,
				categoryId: newSelectedSkill.value.category.id,
				mastery: newSelectedLevel.value,
			});

			await executeAdd();
			showSuccessToast('Skill added successfully');
			isAddSkillModalOpen.value = false;
			await refetchSkills.value();
		} catch (error) {
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
			showSuccessToast('Skill updated successfully');
		} catch (error) {
			console.error('Error updating skill:', error);
		}
	};

	const isRemovalMode = ref(false);
	const selectedSkillsToRemove = ref<Set<string>>(new Set());

	const handleRemoveSkill = () => {
		isRemovalMode.value = true;
	};

	const handleCancelRemoval = () => {
		isRemovalMode.value = false;
		selectedSkillsToRemove.value.clear();
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

	const handleDeleteSkills = async () => {
		try {
			const { executeDelete } = deleteProfileSkill(
				userId.value,
				Array.from(selectedSkillsToRemove.value)
			);
			await executeDelete();
			showSuccessToast('Skills deleted successfully');
			handleCancelRemoval();
		} catch (error) {
			console.error('Error deleting skills:', error);
		}
	};
</script>

<style scoped></style>
