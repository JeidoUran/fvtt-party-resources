export default class ActorDnd5eResources {
  static icons = {
    dnd_fifth_gold:
      "icons/commodities/currency/coins-plain-stack-gold-yellow.webp",
    dnd_fifth_item: null,
  };

  static convert_dnd5e_currencies() {
    const player_gold = this.convert_player_gold();
    const coffre_gold = this.convert_coffre_gold();

    const total_gold = parseFloat(player_gold) + parseFloat(coffre_gold);
    return total_gold.toFixed(2);
  }

  static convert_player_gold() {
    const player_characters = this.player_characters();
    //console.log("Player Characters:", player_characters)
    if (player_characters.length === 0) return 0;

    const player_gold = player_characters
      .map((item) => this.convert_to_dnd5e_gold(item.system.currency))
      .reduce((a, b) => a + b, 0);
    //console.log("Player Gold:", player_gold)

    return player_gold;
  }

  static convert_coffre_gold() {
    const coffre = this.coffre();
    //console.log("Coffre:", coffre)
    if (!coffre) return 0;

    const coffre_gold = this.convert_to_dnd5e_gold(coffre.system.currency);
    //console.log("Coffre Gold:", coffre_gold)

    return coffre_gold;
  }

  static convert_to_dnd5e_gold(currency_object) {
    let total = 0.0;
    if (currency_object) {
      total += currency_object.gp || 0;
    }
    return total;
  }

  static count(type, item_names) {
    switch (type) {
      case "dnd_fifth_gold":
        return this.convert_dnd5e_currencies();
      case "dnd_fifth_item":
        return this.count_player_items(item_names);
      default:
        return;
    }
  }

  static count_player_items(names) {
    names = names.split(";").map((a) => a.trim());
    const items = this.player_items(names);

    if (items.length === 0) return 0;
    if (items.length === 1) return items[0].system?.quantity || 1;

    return items.map((i) => i?.system?.quantity || 0).reduce((a, b) => a + b);
  }

  static player_characters() {
    return game.actors.filter(
      (actor) =>
        actor.type === "character" &&
        [
          "Elsa Horkheimer",
          "Féril Waffenhalter",
          "Oktar",
          "Kay",
          "Ithil",
        ].includes(actor.name)
    );
  }

  static coffre() {
    return game.actors.find((actor) => actor.name === "Coffre des Égarés");
  }

  static player_items(names) {
    return this.player_characters()
      .map((actor) => {
        return actor.collections.items.filter((item) =>
          names.includes(item.name)
        );
      })
      .flat(2);
  }
}
