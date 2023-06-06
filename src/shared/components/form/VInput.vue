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
  type: {
    type: String,
    default: 'text',
    validator(value) {
      return [
        'text',
        'password',
        'textarea',
        'email',
        'search',
        'tel',
        'file',
        'number',
        'url',
        'time',
        'date'
      ].includes(value);
    }
  },
  modelValue: {
    type: [String, Number],
    default: undefined
  }
});

const emit = defineEmits({
  'update:modelValue': () => true
});

const { value: fieldValue, errorMessage } = useField(props.name, undefined, {
  initialValue: props.modelValue
});

const inputValue = computed({
  get() {
    return fieldValue.value;
  },
  set(newValue) {
    fieldValue.value = newValue === '' ? undefined : newValue;
    emit('update:modelValue', fieldValue.value);
  }
});
</script>

<template>
  <fieldset>
    <legend>
      {{ label }}
    </legend>
    <input :name="name" :type="type" v-model="inputValue" />
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </fieldset>
</template>
