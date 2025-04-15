<script setup lang="ts">
  defineOptions({
    inheritAttrs: false,
  });

  defineProps({
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    min: {
      type: [Number, String],
      default: undefined,
    },
    max: {
      type: [Number, String],
      default: undefined,
    },
  });

  defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{
      label
    }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :type="type"
      :min="min"
      :max="max"
      v-bind="$attrs"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
      :placeholder="placeholder"
    />
  </div>
</template>
