
document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';
  if(description != "" && assignedTo != "" ){
        const issue = { id, description, severity, assignedTo, status };
        let issues = [];
        if (localStorage.getItem('issues')){
          issues = JSON.parse(localStorage.getItem('issues'));
        }
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
        document.getElementById('issueInputForm').reset();
        fetchIssues();
        e.preventDefault();
  }else{
    alert('check field!')
  }
}
const closeIssue = id => {
  console.log('close Issue is clicked');
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}
const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => issue.id != id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  console.log('Delete issue is clicked');
  fetchIssues();
}
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  var remCount = 0;
  for (var i = 0; i < issues.length; i++) {
    if(issues[i].status == 'Open'){
      remCount = remCount + 1;
    }
    document.getElementById('remBtn').innerText = remCount;
    console.log('remCount' , remCount);
    const {id, description, severity, assignedTo, status} = issues[i];
    let delStart = '<h3>';
    let delEnd = '</h3>';
    let info = 'label-info'
    if(status == 'Closed'){
      delStart = '<h3><del>';
      delEnd = '</del></h3>';
      info = 'label-danger'
      }
    issuesList.innerHTML +=   `<div class="well">
      <h6>Issue ID: ${id} </h6>
      <p><span class="label ${info}"> ${status} </span></p>
      ${delStart} ${description} ${delEnd}
      <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
      <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
      <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
      <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
      </div>`;              
  }
}

