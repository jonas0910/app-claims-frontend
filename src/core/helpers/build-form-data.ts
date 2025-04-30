// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildFormData = <T extends Record<string, any>>(payload: T): FormData => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      formData.append(key, value.toString());
    } else if (value === null || value === undefined) {
      // No agregamos null ni undefined
    } else if (value instanceof File) {
      console.log("file", value);
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      // 🔄 Convertimos arrays a JSON string directamente
      formData.append(key, JSON.stringify(value));
    } else if (typeof value === "object") {
      // 🔄 Convertimos objetos también a JSON string
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

export default buildFormData;