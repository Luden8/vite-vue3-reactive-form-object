<script setup>
import { useField } from 'vee-validate';
import { computed } from 'vue';

import VInput from '@/shared/components/form/VInput.vue';

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

const { value: fieldValue } = useField(props.name, undefined, {
  initialValue: props.modelValue
});

const inputValue = computed({
  get() {
    return fieldValue.value;
  },
  set(newValue) {
    fieldValue.value = newValue;
    emit('update:modelValue', fieldValue.value);
  }
});
</script>

<template>
  <VInput type="text" :name="name" :label="label" v-model="inputValue" />
  <QBtn label="A" color="primary" @click="inputValue = 'A'" />
  <QBtn label="B" color="primary" @click="inputValue = 'B'" />
  <QBtn label="C" color="primary" @click="inputValue = 'C'" />
</template>
