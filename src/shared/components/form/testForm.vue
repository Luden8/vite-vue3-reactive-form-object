<template>
  <div>
    <h5>Current props inside the component:</h5>
    Props object is not reactive:
    <br />
    {{ props }}
    <br />
    but its properties are:
    <br />
    {{ props.modelValue }}
    <br />
    <br />
    <h5>This is current form state, it is reactive because of toRefs</h5>
    {{ values }}
    <input type="text" v-model="value" />
    <input type="text" v-model="testPropValue" />
    Value: {{ value }}
    <button @click="saveModelValue">Update value</button>
  </div>
</template>
<script setup>
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { toRefs } from 'vue';
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ name: '', testProp: '' })
  }
});

const emits = defineEmits(['update:model-value']);

const refProps = toRefs(props);

const schema = yup.object({
  name: yup.string()
});
const { values } = useForm({
  validationSchema: schema,
  initialValues: refProps.modelValue
});

const saveModelValue = () => {
  emits('update:model-value', { ...values });
};

const { value } = useField('name');
const { value: testPropValue } = useField('testProp');
</script>
