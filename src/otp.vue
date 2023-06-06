<template>
	<div class="two-factor-auth">
		<div class="flex space-x-5">
			<div
				v-for="(input, index) in props.digits"
				:key="index"
				class="w-[80px]"
			>
				<one-time-password-input
					:focus="activeInput === index"
					:value="otp[index]"
					@on-change="handleOnChange"
					@on-keydown="handleOnKeyDown"
					@on-paste="handleOnPaste"
					@on-focus="handleOnFocus(index)"
					@on-blur="handleOnBlur"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
interface Input2FACodeProps {
	digits: number
	modelValue: string
	focus?: boolean
	inputType: string
}

interface Input2FACodeEmits {
	(e: 'on-complete', payload: string): void
	(e: 'on-change', payload: string): void
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import oneTimePasswordInput from './otp-input.vue'

// keyCode constants
const BACKSPACE = 8
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const DELETE = 46

const props = defineProps<Input2FACodeProps>()
const emit = defineEmits<Input2FACodeEmits>()

const activeInput = ref(0)
const otp = ref<string[]>([])
const oldOtp = ref<string[]>([])

const handleOnFocus = (index: number) => {
	activeInput.value = index
}
const handleOnBlur = () => {
	activeInput.value = -1
}

// Helper to return OTP from input
const checkFilledAllInputs = () => {
	if (otp.value.join('').length === props.digits) {
		emit('on-complete', otp.value.join(''))
	}
	return 'Wait until the user enters the required number of characters'
}

// Focus on input by index
const focusInput = (input) => {
	activeInput.value = Math.max(Math.min(props.digits - 1, input), 0)
}

// Focus on next input
const focusNextInput = () => {
	focusInput(activeInput.value + 1)
}

// Focus on previous input
const focusPrevInput = () => {
	focusInput(activeInput.value - 1)
}
// Change OTP value at focused input
const changeCodeAtFocus = (value) => {
	oldOtp.value = [...otp.value]
	otp.value[activeInput.value] = value
	if (oldOtp.value.join('') !== otp.value.join('')) {
		emit('on-change', otp.value.join(''))
		checkFilledAllInputs()
	}
}
// Handle pasted OTP
const handleOnPaste = (event) => {
	event.preventDefault()
	const pastedData = event.clipboardData
		.getData('text/plain')
		.slice(0, props.digits - activeInput.value)
		.split('')
	if (props.inputType === 'number' && !pastedData.join('').match(/^\d+$/)) {
		return 'Invalid pasted data'
	}
	// Paste data from focused input onwards
	const currentCharsInOtp = otp.value.slice(0, activeInput.value)
	const combinedWithPastedData = currentCharsInOtp.concat(pastedData)
	otp.value = combinedWithPastedData.slice(0, props.digits)
	focusInput(combinedWithPastedData.slice(0, props.digits).length)
	return checkFilledAllInputs()
}

const handleOnChange = (value: string) => {
	changeCodeAtFocus(value)
	focusNextInput()
}

// Handle cases of backspace, delete, left arrow, right arrow
const handleOnKeyDown = (event: KeyboardEvent) => {
	switch (event.keyCode) {
		case BACKSPACE:
			event.preventDefault()
			changeCodeAtFocus('')
			focusPrevInput()
			break
		case DELETE:
			event.preventDefault()
			changeCodeAtFocus('')
			break
		case LEFT_ARROW:
			event.preventDefault()
			focusPrevInput()
			break
		case RIGHT_ARROW:
			event.preventDefault()
			focusNextInput()
			break
		default:
			break
	}
}
</script>
