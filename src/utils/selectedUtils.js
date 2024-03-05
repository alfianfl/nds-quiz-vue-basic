export function getAvailableUsers(activeSearchTerm, props) {
    let users = [];
    if (activeSearchTerm.value) {
      users = props.users.filter((usr) =>
        usr.fullName.toLowerCase().includes(activeSearchTerm.value.toLowerCase())
      );
  
    } else if (props.users) {
      users = props.users;
    }
    return users;
}

export function getSelectedProject(activeSearchTerm, props) {
  if (activeSearchTerm.value) {
    return props.user.projects.filter((prj) =>
      prj.title.toLowerCase().includes(activeSearchTerm.value.toLowerCase())
    );
  }
  return props.user.projects;
}
  