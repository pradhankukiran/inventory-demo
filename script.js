document.addEventListener("DOMContentLoaded", function () {
  updateExportButtonVisibility();
  updateConferenceExportButtonVisibility();
  // flatpickr("#demoStartDate", {
  //   enableTime: false,
  //   dateFormat: "n/j",
  //   minDate: "today",
  //   maxDate: "2031-12-31",
  // });
  // flatpickr("#demoEndDate", {
  //   enableTime: false,
  //   dateFormat: "n/j",
  //   minDate: "today",
  //   maxDate: "2031-12-31",
  // });
  // flatpickr("#conferenceStartDate", {
  //   enableTime: false,
  //   dateFormat: "n/j",
  //   minDate: "today",
  //   maxDate: "2031-12-31",
  //   onReady: function (selectedDates, dateStr, instance) {
  //     instance.calendarContainer.style.zIndex = 9999;
  //     instance.calendarContainer.style.right = "auto";
  //     instance.calendarContainer.style.left = "auto";
  //   },
  // });
  // flatpickr("#conferenceEndDate", {
  //   enableTime: false,
  //   dateFormat: "n/j",
  //   minDate: "today",
  //   maxDate: "2031-12-31",
  //   onReady: function (selectedDates, dateStr, instance) {
  //     instance.calendarContainer.style.zIndex = 9999;
  //     instance.calendarContainer.style.right = "auto";
  //     instance.calendarContainer.style.left = "auto";
  //   },
  // });

  const demoStartDatePicker = flatpickr("#demoStartDate", {
    enableTime: false,
    dateFormat: "n/j",
    minDate: "today",
    maxDate: "2031-12-31",
    onChange: function (selectedDates, dateStr, instance) {
      updateCalendar();
    },
  });

  const demoEndDatePicker = flatpickr("#demoEndDate", {
    enableTime: false,
    dateFormat: "n/j",
    minDate: "today",
    maxDate: "2031-12-31",
  });

  const conferenceStartDatePicker = flatpickr("#conferenceStartDate", {
    enableTime: false,
    dateFormat: "n/j",
    minDate: "today",
    maxDate: "2031-12-31",
    onChange: function (selectedDates, dateStr, instance) {
      updateCalendar();
    },
  });

  const conferenceEndDatePicker = flatpickr("#conferenceEndDate", {
    enableTime: false,
    dateFormat: "n/j",
    minDate: "today",
    maxDate: "2031-12-31",
  });

  const calendar = flatpickr("#calendar", {
    inline: true,
    enableTime: false,
    dateFormat: "n/j",
    showMonths: 2,
    onChange: function (selectedDates, dateStr, instance) {
      updateCalendar();
    },
  });

  function updateCalendar() {
    const demoStartDate = demoStartDatePicker.selectedDates[0];
    const conferenceStartDate = conferenceStartDatePicker.selectedDates[0];

    calendar.set("onDayCreate", function (dObj, dStr, fp, dayElem) {
      dayElem.classList.remove("highlighted-blue");
      dayElem.classList.remove("highlighted-green");

      if (
        demoStartDate &&
        flatpickr.formatDate(demoStartDate, "Y-m-d") === flatpickr.formatDate(dayElem.dateObj, "Y-m-d")
      ) {
        dayElem.classList.add("highlighted-blue");
      }
      if (
        conferenceStartDate &&
        flatpickr.formatDate(conferenceStartDate, "Y-m-d") === flatpickr.formatDate(dayElem.dateObj, "Y-m-d")
      ) {
        dayElem.classList.add("highlighted-green");
      }
    });
  }

  loadFromLocalStorage();

  document.getElementById("addDemoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const salesperson = document.getElementById("demoSalesperson").value;
    const name = document.getElementById("demoName").value;
    const location = document.getElementById("demoLocation").value;
    const startDate = document.getElementById("demoStartDate").value;
    const endDate = document.getElementById("demoEndDate").value;

    const template = document.getElementById("demoTemplate");
    const clone = template.cloneNode(true);
    clone.style.display = "";
    clone.querySelector(".demo-details").innerText = `${name} (${startDate} to ${endDate})`;
    clone.querySelector(".demo-salesperson").innerText = salesperson;
    clone.querySelector(".demo-account").innerText = name;
    clone.querySelector(".demo-location").innerText = location;
    clone.querySelector(".demo-dates").innerText = `${startDate} to ${endDate}`;

    clone.querySelector(".entry-content").style.display = "none";

    document.getElementById("demoList").appendChild(clone);

    clone.querySelectorAll(".task-date").forEach((input) => {
      flatpickr(input, {
        enableTime: false,
        dateFormat: "n/j",
        minDate: "today",
        maxDate: "2031-12-31",
        onChange: function (selectedDates, dateStr, instance) {
          saveToLocalStorage();
        },
      });
    });

    saveToLocalStorage();

    document.getElementById("addDemoForm").reset();
  });

  document.getElementById("addConferenceForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("conferenceName").value;
    const location = document.getElementById("conferenceLocation").value;
    const startDate = document.getElementById("conferenceStartDate").value;
    const endDate = document.getElementById("conferenceEndDate").value;

    const template = document.getElementById("conferenceTemplate");
    const clone = template.cloneNode(true);
    clone.style.display = "";
    clone.querySelector(".conference-details").innerText = `${name} (${startDate} to ${endDate})`;
    clone.querySelector(".conference-name").innerText = name;
    clone.querySelector(".conference-location").innerText = location;
    clone.querySelector(".conference-dates").innerText = `${startDate} to ${endDate}`;

    clone.querySelector(".entry-content").style.display = "none";

    document.getElementById("conferenceList").appendChild(clone);

    clone.querySelectorAll(".task-date").forEach((input) => {
      flatpickr(input, {
        enableTime: false,
        dateFormat: "n/j",
        minDate: "today",
        maxDate: "2031-12-31",
        onChange: function (selectedDates, dateStr, instance) {
          saveToLocalStorage();
        },
      });
    });

    saveToLocalStorage();

    document.getElementById("addConferenceForm").reset();
  });

  document.querySelectorAll(".task-date").forEach((input) => {
    flatpickr(input, {
      enableTime: false,
      dateFormat: "n/j",
      minDate: "today",
      maxDate: "2031-12-31",
      onChange: function (selectedDates, dateStr, instance) {
        saveToLocalStorage();
      },
    });
  });
});

function showAddDocumentSection(button, sectionId) {
  const entryContent = button.closest("tr");
  const documentSection = entryContent.querySelector(`.documents[data-section="${sectionId}"]`);

  const documentInput = document.createElement("input");
  documentInput.type = "file";
  documentInput.className = "document-input";
  documentInput.accept =
    "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  documentInput.multiple = true;
  documentInput.hidden = true;
  documentInput.click();

  documentInput.addEventListener("change", function () {
    const files = Array.from(documentInput.files);
    const documents = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    documents.forEach((doc) => {
      const documentItem = document.createElement("div");
      documentItem.className = "document-item";
      const fileName = document.createElement("a");

      fileName.textContent = doc.name;
      fileName.href = doc.url;
      fileName.target = "_blank";

      documentItem.appendChild(fileName);
      documentSection.appendChild(documentItem);
    });
  });

  documentSection.appendChild(documentInput);
}

function saveToLocalStorage() {
  const demoList = document.getElementById("demoList").innerHTML;
  const conferenceList = document.getElementById("conferenceList").innerHTML;
  const taskDates = Array.from(document.querySelectorAll(".task-date")).map((input) => input.value);
  localStorage.setItem("demoList", demoList);
  localStorage.setItem("conferenceList", conferenceList);
  localStorage.setItem("taskDates", JSON.stringify(taskDates));
}

function loadFromLocalStorage() {
  const demoList = localStorage.getItem("demoList");
  const conferenceList = localStorage.getItem("conferenceList");
  const taskDates = JSON.parse(localStorage.getItem("taskDates")) || [];

  if (demoList) document.getElementById("demoList").innerHTML = demoList;
  if (conferenceList) document.getElementById("conferenceList").innerHTML = conferenceList;

  document.querySelectorAll(".task-date").forEach((input, index) => {
    input.value = taskDates[index] || "";
    flatpickr(input, {
      enableTime: false,
      dateFormat: "n/j",
      minDate: "today",
      maxDate: "2031-12-31",
      onChange: function (selectedDates, dateStr, instance) {
        saveToLocalStorage();
      },
    });
  });
  updateExportButtonVisibility();
  updateConferenceExportButtonVisibility();
}

function editEvent(event, button) {
  event.stopPropagation();
  toggleEntry(button);
}

function toggleEntry(button) {
  const content = button.closest(".entry").querySelector(".entry-content");
  content.style.display = content.style.display === "none" ? "block" : "none";
}

function confirmDeleteEvent(event, button) {
  event.stopPropagation();
  if (confirm("Are you sure you want to delete this entry?")) {
    deleteEvent(button);
  }
}

function deleteEvent(button) {
  const entry = button.closest(".entry");
  entry.remove();
  saveToLocalStorage();
}

function addNote(button) {
  const noteButton = button;
  const noteInput = noteButton.previousElementSibling;
  const notesContainer = noteInput.parentElement.querySelector(".notes");
  const noteText = noteInput.value.trim();

  if (!noteText) {
    return;
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
  });

  const noteEntry = document.createElement("div");
  noteEntry.classList.add("note-entry");

  const dateRegex = /^\d{1,2}\/\d{1,2} - /;
  const isEdit = dateRegex.test(noteText);

  noteEntry.innerHTML = `
    <span class="note-text">${isEdit ? noteText : `${currentDate} - ${noteText}`}</span>
    <button style="background:none;" class="edit" onclick="editNote(this)">✏️</button>
    <button style="background:none;" class="delete" onclick="confirmDeleteNote(event,this)">🗑️</button>
  `;
  notesContainer.appendChild(noteEntry);

  noteInput.value = "";

  saveToLocalStorage();
}

function editNote(button) {
  const noteEntry = button.parentElement;
  const noteText = noteEntry.querySelector(".note-text").innerText;
  const dateRegex = /^\d{1,2}\/\d{1,2} - /;
  const actualNoteText = noteText.replace(dateRegex, "");
  const noteInput = noteEntry.closest(".entry-content").querySelector(".note-input");
  noteInput.value = actualNoteText;

  noteEntry.remove();

  saveToLocalStorage();
}

function deleteNote(button) {
  const noteEntry = button.parentElement;
  noteEntry.remove();

  saveToLocalStorage();
}

function confirmDeleteNote(event, button) {
  event.stopPropagation();
  if (confirm("Are you sure you want to delete this note?")) {
    deleteNote(button);
  }
}

function showAddEquipmentSection(button, type) {
  const entry = button.closest(".entry");
  let modal;
  if (type === "demo") {
    modal = document.getElementById("addDemoEquipmentSection");
    modal.style.display = "block";
    modal.dataset.entryIndex = Array.from(document.getElementById("demoList").children).indexOf(entry);
  } else {
    modal = document.getElementById("addConferenceEquipmentSection");
    modal.style.display = "block";
    modal.dataset.entryIndex = Array.from(document.getElementById("conferenceList").children).indexOf(entry);
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function addDemoEquipment() {
  const equipment = document.getElementById("demoEquipmentSelect").selectedOptions[0].textContent;
  const serialNo = document.getElementById("demoEquipmentSelect").value;
  const quantity = document.getElementById("demoEquipmentQuantity").value;

  const demoList = document.getElementById("demoList");
  const entryIndex = document.getElementById("addDemoEquipmentSection").dataset.entryIndex;
  const entry = demoList.children[entryIndex];
  const equipmentTd = entry.querySelector(".equipment");

  const equipmentEntry = document.createElement("div");
  equipmentEntry.innerHTML = `Ref # : ${equipment} <br> Quantity: [ ${quantity} ]<button style=" background:none;" class="delete" onclick="confirmDeleteEquipment(event, this)">🗑️</button>`;
  equipmentTd.appendChild(equipmentEntry);

  document.getElementById("addDemoEquipmentSection").style.display = "none";
  updateExportButtonVisibility();

  saveToLocalStorage();
}

function addConferenceEquipment() {
  const equipment = document.getElementById("conferenceEquipmentSelect").selectedOptions[0].textContent;
  const serialNo = document.getElementById("conferenceEquipmentSelect").value;
  const quantity = document.getElementById("conferenceEquipmentQuantity").value;

  const conferenceList = document.getElementById("conferenceList");
  const entryIndex = document.getElementById("addConferenceEquipmentSection").dataset.entryIndex;
  const entry = conferenceList.children[entryIndex];
  const equipmentTd = entry.querySelector(".equipment");

  const equipmentEntry = document.createElement("div");
  equipmentEntry.innerHTML = `Ref # : ${equipment} <br> Quantity: [ ${quantity} ]<button style=" background:none;" class="delete" onclick="confirmDeleteEquipment(event, this)">🗑️</button>`;
  equipmentTd.appendChild(equipmentEntry);

  document.getElementById("addConferenceEquipmentSection").style.display = "none";
  updateConferenceExportButtonVisibility();

  saveToLocalStorage();
}

function confirmDeleteEquipment(event, button) {
  event.stopPropagation();
  if (confirm("Are you sure you want to delete this equipment?")) {
    deleteEquipment(button);
  }
  updateExportButtonVisibility();
  updateConferenceExportButtonVisibility();
}

function deleteEquipment(button) {
  const equipmentEntry = button.closest("div");
  equipmentEntry.remove();
  saveToLocalStorage();
}

function exportDemoEquipment() {
  const demoList = document.getElementById("demoList");
  const rows = demoList.querySelectorAll("tr");
  let data = [];
  rows.forEach((row) => {
    const equipment = row.querySelector(".equipment");
    if (equipment) {
      const equipmentEntries = equipment.querySelectorAll("div");
      equipmentEntries.forEach((entry) => {
        const text = entry.textContent.replace(/\n/g, "").replace(/🗑️/g, "").trim();
        const parts = text.split("Quantity: [ ");
        const equipmentRef = parts[0].replace("Ref # : ", "").trim();
        const quantity = parts[1].replace(" ]", "").trim();
        const refNo = equipmentRef.split(" ")[0];
        const equipmentName = equipmentRef.split(" ").slice(1).join(" ");
        data.push([refNo, equipmentName, quantity]);
      });
    }
  });
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([["Ref No.", "Equipment Name", "Quantity"], ...data]);

  ws["!cols"] = [{ wch: 25 }, { wch: 40 }, { wch: 10 }];

  XLSX.utils.book_append_sheet(wb, ws, "Equipment List");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = "equipment_list.xlsx";
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function exportConferenceEquipment() {
  const conferenceList = document.getElementById("conferenceList");
  const rows = conferenceList.querySelectorAll("tr");
  let data = [];
  rows.forEach((row) => {
    const equipment = row.querySelector(".equipment");
    if (equipment) {
      const equipmentEntries = equipment.querySelectorAll("div");
      equipmentEntries.forEach((entry) => {
        const text = entry.textContent.replace(/\n/g, "").replace(/🗑️/g, "").trim();
        const parts = text.split("Quantity: [ ");
        const equipmentRef = parts[0].replace("Ref # : ", "").trim();
        const quantity = parts[1].replace(" ]", "").trim();
        const refNo = equipmentRef.split(" ")[0];
        const equipmentName = equipmentRef.split(" ").slice(1).join(" ");
        data.push([refNo, equipmentName, quantity]);
      });
    }
  });
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([["Ref No.", "Equipment Name", "Quantity"], ...data]);

  ws["!cols"] = [{ wch: 25 }, { wch: 40 }, { wch: 10 }];

  XLSX.utils.book_append_sheet(wb, ws, "Equipment List");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = "equipment_list.xlsx";
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function updateExportButtonVisibility() {
  const demoList = document.getElementById("demoList");
  const rows = demoList.querySelectorAll("tr");
  let hasEquipment = false;
  rows.forEach((row) => {
    const equipment = row.querySelector(".equipment");
    if (equipment && equipment.querySelectorAll("div").length > 0) {
      hasEquipment = true;
    }
  });

  if (hasEquipment) {
    document.getElementById("exportDemoButton").style.display = "inline-block";
  } else {
    document.getElementById("exportDemoButton").style.display = "none";
  }
}
function updateConferenceExportButtonVisibility() {
  const conferenceList = document.getElementById("conferenceList");
  const rows = conferenceList.querySelectorAll("tr");
  let hasEquipment = false;
  rows.forEach((row) => {
    const equipment = row.querySelector(".equipment");
    if (equipment && equipment.querySelectorAll("div").length > 0) {
      hasEquipment = true;
    }
  });

  const exportButton = document.getElementById("exportConferenceButton");
  if (hasEquipment) {
    exportButton.style.display = "inline-block";
  } else {
    exportButton.style.display = "none";
  }
}
