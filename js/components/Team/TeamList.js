const renderTeamItem = ({ _id, name }) => `
  <div class="team-card-container">
    <a href="/kanban.html?team-id=${_id}" class="card">
      <div class="card-title">${name}</div>
    </a>
    <button class="destroy" data-team-id="${_id}"></button>
  </div>
`;

export default function TeamList(listEl, teamApp) {
  this.createTeam = ({ target }) => {
    if (!target.classList.contains("ripple")) {
      return;
    }

    const name = prompt("추가하고 싶은 팀 이름을 입력해주세요.").trim();
    if (name.length < 2) {
      alert("이름은 최소 2글자 이상이어야 합니다.");
      return;
    }

    teamApp.createTeam(name);
  };

  this.deleteTeam = ({ target }) => {
    if (!target.classList.contains("destroy")) {
      return;
    }

    const { teamId } = target.dataset;
    const { name } = teamApp.getTeam(teamId);
    if (!confirm(`정말로 삭제하시겠습니까?\n\n${name}`)) {
      return;
    }

    teamApp.deleteTeam(teamId);
  };

  this.render = () => {
    listEl.innerHTML = `
      ${teamApp.teams.map(renderTeamItem).join("")}
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>
    `;
  };

  listEl.addEventListener("click", this.createTeam);
  listEl.addEventListener("click", this.deleteTeam);
}