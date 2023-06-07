<template>
  <h3>Parent v-model value</h3>
  <pre>{{ modelValue }}</pre>
  <button @click="handleSet">Change parent's state</button>
  <br />
  <br />
  <test-form v-model="modelValue"></test-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import testForm from './shared/components/form/testForm.vue';

const modelValue = ref({
  name: '',
  testProp: ''
});

const handleSet = () =>
  (modelValue.value = {
    name: 'ttest',
    testProp: 'testtest'
  });
</script>
