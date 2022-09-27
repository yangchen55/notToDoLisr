let taskList = [];
let badList = [];
const hrPerweek = 24 * 7;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hr = +frmData.get("hr");

  const obj = {
    task,
    hr,
  };

  const totalTaskHrs = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  const total = totalTaskHrs + hr + totalBadHours();

  if (total > hrPerweek) {
    return alert("not wnough hour in week");
  }
  taskList.push(obj);
  display();
  totalTaskHours();
};

const display = () => {
  let str = "";

  taskList.map((item, i) => {
    str += `

   <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${item.task}</td>
                    <td>${item.hr}</td>
                    <td>
                      <button onclick = "deleteItem(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                      <button onclick = "markAsNotToDo(${i})"class="btn btn-success"><i class="fa-solid fa-arrow-right-long"></i></button>
                    </td>
                  </tr>

  `;
  });
  document.getElementById("task-list").innerHTML = str;
  totalTaskHours();
};

const totalTaskHours = () => {
  const total = taskList.reduce((acc, item) => {
    return acc + item.hr;
  }, 0);
  document.getElementById("ttlhrs").innerHTML = total + totalBadHours();
};

// delete item
const deleteItem = (i) => {
  if (!window.confirm("delete?")) {
    return;
    // only false, goes to filter statement
  }

  const tempArg = taskList.filter((item, index) => {
    return i !== index;
  });

  taskList = tempArg;

  display();
};
// for the bad list

const totalBadHours = () => {
  const total = badList.reduce((subTtl, item) => {
    return subTtl + item.hr;
  }, 0);
  document.getElementById("ttlBadhrs").innerText = total;
  return total;
};

const markAsNotToDo = (i) => {
  const item = taskList.splice(i, 1)[0];
  badList.push(item);
  displayBadList();
  display();
};

const displayBadList = () => {
  let str = "";

  badList.map((item, i) => {
    str += `

   <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${item.task}</td>
                    <td>${item.hr}</td>
                    <td>
                      <button onclick = "deleteBadItem(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                      <button onclick = "markAsToDo(${i})" class="btn btn-success"><i class="fa-solid fa-arrow-left-long"></i></button>
                    </td>
                  </tr>

  `;
  });
  document.getElementById("bad-list").innerHTML = str;
  totalBadHours();
};

const deleteBadItem = (i) => {
  if (!window.confirm("delete?")) {
    return;
    // only false, goes to filter statement
  }

  const tempArg = badList.filter((item, index) => {
    return i !== index;
  });

  badList = tempArg;

  displayBadList();
};

const markAsToDo = (i) => {
  const item = badList.splice(i, 1)[0];
  taskList.push(item);
  displayBadList();
  display();
};
// always go with immutation ddata
