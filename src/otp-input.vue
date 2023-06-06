<template>
	<input
		ref="input"
		v-model="model"
		type="text"
		min="0"
		max="9"
		maxlength="1"
		pattern="[0-9]"
		class="w-full h-[80px] text-center rounded-small text-neurtal-900 font-medium text-xl"
		@input="handleOnChange"
		@keydown="handleOnKeyDown"
		@paste="handleOnPaste"
		@focus="handleOnFocus"
		@blur="handleOnBlur"
	/>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import isCodeNumeric from '@/utils/isCodeNumeric'
interface OneTimePasswordProps {
	value?: string
	focus?: boolean
}

interface OneTimePasswordEmits {
	(e: 'on-change', event: unknown): void
	(e: 'on-keydown', event: unknown): void
	(e: 'on-paste', event: unknown): void
	(e: 'on-focus'): void
	(e: 'on-blur'): void
}

const model = ref('')
const input = ref<HTMLInputElement | null>(null)

const props = withDefaults(defineProps<OneTimePasswordProps>(), {
	value: '',
	focus: false,
})

const emit = defineEmits<OneTimePasswordEmits>()

onMounted(() => {
	if (props.focus) {
		input.value?.focus()
	}
})

watch(props.value, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		model.value = newValue
	}
})

watch(props.focus, (newFocusValue, oldFocusValue) => {
	if (oldFocusValue !== newFocusValue && input && props.focus) {
		input.value?.focus()
		input.value?.select()
	}
})

const handleOnChange = () => {
	if (model.value.length > 1) {
		model.value = model.value.slice(0, 1)
	}
	return emit('on-change', model.value)
}

const handleOnKeyDown = (event: KeyboardEvent) => {
	// Only allow characters 0-9, DEL, Backspace, Enter, Right and Left Arrows, and Pasting
	const keyEvent = event || window.event
	const charCode = keyEvent.which ? keyEvent.which : keyEvent.keyCode
	if (
		isCodeNumeric(charCode) ||
		[8, 9, 13, 37, 39, 46, 86].includes(charCode)
	) {
		emit('on-keydown', event)
	} else {
		keyEvent.preventDefault()
	}
}

const handleOnPaste = (event: unknown) => {
	emit('on-paste', event)
}

const handleOnFocus = () => {
	input.value?.select()
	emit('on-focus')
}

const handleOnBlur = () => {
	emit('on-blur')
}
</script>
