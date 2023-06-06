<script setup>
import { useField } from 'vee-validate';
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: undefined
  }
});

const emit = defineEmits({
  'update:modelValue': () => true
});

const {
  value: fieldValue,
  errorMessage,
  checked,
  handleChange
} = useField(props.name, undefined, {
  type: 'checkbox',
  checkedValue: 'Yes',
  uncheckedValue: 'No'
});

const inputValue = computed({
  get() {
    return checked.value;
  },
  set(newValue) {
    handleChange(newValue);
    emit('update:modelValue', fieldValue.value);
  }
});
</script>

<template>
  <fieldset>
    <input type="checkbox" v-model="inputValue" />
    <span>
      {{ label }}
    </span>
    <pre>{{ { fieldValue, checked } }}</pre>
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </fieldset>
</template>
