import ActorDnd5eResources from "./actor_dnd5e_resources.mjs";

export default function inject_player_gold_in_scene_nav(html) {
  if (game.user.isGM && $(".party-resources-custom-ui", html).length === 0) {
    $("<li>")
      .addClass("ui-control")
      .addClass("party-resources-custom-ui")
      .append(
        `<div><i class="fa-solid fa-coins"></i> ${ActorDnd5eResources.convert_player_gold()}en (Coffre : ${ActorDnd5eResources.convert_coffre_gold()})</div>`
      )
      .insertAfter($("#scene-navigation-active li.ui-control", html));
    $(".party-resources-custom-ui").click(() => {
      window.pr.dashboard.render(true, { focus: true });
    });
  }
}
