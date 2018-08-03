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
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
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
  switch(blob.type) {
    case 'image/png':
      extension = 'png';
      break;
    case 'image/jpeg':
      extension = 'jpg';
      break;
    case 'image/gif':
      extension = 'gif';
      break;
  }
  return `${fileName}.${extension}`;
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
};
