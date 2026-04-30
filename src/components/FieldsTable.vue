<template>
  <div v-if="!fields || fields.length === 0" class="empty-fields">
    This section has no structured field table.
  </div>

  <div v-else class="table-wrap">
    <table class="fields-table">
      <thead>
        <tr>
          <th>{{ firstHeader }}</th>
          <th v-if="hasSampleColumn">{{ sampleHeader }}</th>
          <th>{{ secondHeader }}</th>
          <th>Requirement</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="field in normalizedFields" :key="field.name">
          <td>{{ field.name }}</td>
          <td v-if="hasSampleColumn">{{ field.sample || "-" }}</td>
          <td>{{ field.type }}</td>
          <td>
            <span
              :class="[
                'req-badge',
                isMandatory(field.requirement)
                  ? 'req-mandatory'
                  : isConditional(field.requirement)
                  ? 'req-conditional'
                  : isRecommended(field.requirement)
                  ? 'req-recommended'
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
  sampleHeader: {
    type: String,
    default: "Typical Value",
  },
  showSample: {
    type: Boolean,
    default: false,
  },
});

const normalizedFields = computed(() => {
  return props.fields.map((field) => {
    const isObject = !Array.isArray(field);
    const hasArraySample = Array.isArray(field) && field.length >= 5;

    return {
      name: isObject ? field.name : field[0],
      sample: isObject ? field.sample : hasArraySample ? field[1] : "",
      type: isObject ? field.type : hasArraySample ? field[2] : field[1],
      requirement: isObject ? field.requirement : hasArraySample ? field[3] : field[2],
      description: isObject ? field.description : hasArraySample ? field[4] : field[3],
    };
  });
});

const hasSampleColumn = computed(() => {
  return props.showSample || normalizedFields.value.some((field) => field.sample);
});

function isMandatory(value) {
  return value === "Mandatory" || value?.startsWith?.("Mandatory");
}

function isConditional(value) {
  return value === "Conditional" || value?.startsWith?.("Conditional");
}

function isRecommended(value) {
  return value === "Recommended" || value?.startsWith?.("Recommended");
}
</script>
