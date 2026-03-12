<template>
  <div v-if="!fields || fields.length === 0" class="empty-fields">
    This section has no structured field table.
  </div>

  <div v-else class="table-wrap">
    <table class="fields-table">
      <thead>
        <tr>
          <th>{{ firstHeader }}</th>
          <th>{{ secondHeader }}</th>
          <th>Requirement</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="field in normalizedFields" :key="field.name">
          <td>{{ field.name }}</td>
          <td>{{ field.type }}</td>
          <td>
            <span
              :class="[
                'req-badge',
                isMandatory(field.requirement)
                  ? 'req-mandatory'
                  : field.requirement === 'Optional'
                  ? 'req-optional'
                  : 'req-returned',
              ]"
            >
              {{ field.requirement }}
            </span>
          </td>
          <td>{{ field.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  fields: {
    type: Array,
    default: () => [],
  },
  firstHeader: {
    type: String,
    default: "Field",
  },
  secondHeader: {
    type: String,
    default: "Type",
  },
});

const normalizedFields = computed(() => {
  return props.fields.map((field) => {
    const isObject = !Array.isArray(field);

    return {
      name: isObject ? field.name : field[0],
      type: isObject ? field.type : field[1],
      requirement: isObject ? field.requirement : field[2],
      description: isObject ? field.description : field[3],
    };
  });
});

function isMandatory(value) {
  return value === "Mandatory" || value?.startsWith?.("Mandatory");
}
</script>