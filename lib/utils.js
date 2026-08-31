/**
 * Convert File or Blob object to base64 string
 *
 * @async
 * @param {File|Blob} file - image file
 * @returns {Promise<string>}
 */
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

/**
 * Get file name with extension for Blob
 * @param {Blob} blob - file
 */
function getFileName(blob) {
  const fileName = 'filename';
  let extension;
  switch (blob.type) {
    case 'image/png':
      extension = 'png';
      break;
    case 'image/jpeg':
      extension = 'jpg';
      break;
    case 'image/gif':
      extension = 'gif';
      break;
    case 'image/webp':
      extension = 'webp';
      break;
    default:
      throw new Error('Unsupported file format');
  }
  return `${fileName}.${extension}`;
}

/**
 * Check if value is a File or Blob instance
 *
 * @param {*} value - value to check
 * @returns {boolean}
 */
function isBlob(value) {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

/**
 * Convert a flat fields object into a FormData instance.
 * File/Blob values are appended as files, plain objects are JSON-stringified,
 * null/undefined values are skipped (to mirror JSON.stringify's behaviour).
 *
 * @param {Object} fields - flat object of request fields
 * @returns {FormData}
 */
function toFormData(fields) {
  const form = new FormData();

  Object.keys(fields).forEach((key) => {
    const value = fields[key];

    if (value === null || value === undefined) {
      return;
    }

    if (isBlob(value)) {
      form.append(key, value, value.name || getFileName(value));
    } else if (typeof value === 'object') {
      form.append(key, JSON.stringify(value));
    } else {
      form.append(key, String(value));
    }
  });

  return form;
}

/**
 * Build request data for axios - returns a FormData instance if any of
 * the fields is a File/Blob, otherwise returns the fields object unchanged.
 *
 * @param {Object} fields - flat object of request fields
 * @returns {Object|FormData}
 */
function buildRequestData(fields) {
  const hasBlob = Object.keys(fields).some((key) => isBlob(fields[key]));

  return hasBlob ? toFormData(fields) : fields;
}

/**
 * Get error description
 *
 * @param {Array} tasks - array of tasks
 * @returns {string}
 */
function getTaskError(tasks) {
  let errorText = '';
  tasks.forEach((task) => {
    if (!task.is_successful) {
      errorText += `Subtask failed: ${task.task_id}\n`;
    }
  });

  return errorText;
}

export default {
  getBase64,
  getFileName,
  getTaskError,
  isBlob,
  toFormData,
  buildRequestData,
};
