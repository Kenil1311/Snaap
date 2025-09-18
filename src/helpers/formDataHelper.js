export const toFormData = (obj) => {
  const formData = new FormData();

  for (const key in obj) {

    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v instanceof File) {
            // For files
            formData.append(key, v);
          } else if (typeof v === "object" && v !== null) {
            // For arrays of objects like { label, value }, append the value
            formData.append(`${key}[]`, v.value);
          } else {
            // For arrays of primitive types
            formData.append(`${key}[]`, v);
          }
        });

      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }
  }

  console.log("formData", formData)
  return formData;
};
