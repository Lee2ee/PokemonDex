import Component from "../core/Component";
import { getPokemoSpecies, getPokemonInfo } from "../service/api";
import { convertedText } from "../utils/convertText";
import { typeColor, typeIcon } from "../utils/pokeType";

class PokeInfo extends Component {
  // 템플릿을 반환하는 함수
  template() {
    const { pokemonId } = this.$props;
    const { info, species } = this.$state;
    const types = (info?.types ?? []).reduce(
      (acc, curr) =>
        acc +
        `<button style="background:${typeColor[curr.type.name]};">
				<img src=${typeIcon[curr.type.name]} alt="rock" width="20"/>
					<span>${convertedText[curr.type.name]}</span>
				</button>`,
      ""
    );
    return `
      	<div class="poke-info">
					<div class="poke-txt">
						<p>No.${String(pokemonId).padStart(4, "0")}</p>
						<h3>${species?.names?.[2]?.name ?? ""}</h3>
					</div>
					<div class="poke-type">${types}</div>
				</div>
      `;
  }

  // 컴포넌트의 상태를 설정하는 함수
  setup() {
    this.$state = {};
    this.$getPokemonDetail();
  }

  // 포켓몬 상세 정보를 가져오는 함수
  async $getPokemonDetail() {
    const { pokemonId } = this.$props;
    const callReqs = [getPokemoSpecies(pokemonId), getPokemonInfo(pokemonId)];
    const results = await Promise.allSettled(callReqs);

    const [species, info] = results.map((result, idx) => {
      if (result.status === "rejected") {
        this.retryApi(callReqs[idx], 3).then((data) => {
          return data;
        });
      }
      return result.value;
    });
    this.setState({ species, info });
  }

  // API 요청을 재시도하는 함수
  async retryApi(PromiseReq, count) {
    if (!count) return {};
    count--;
    try {
      const result = await PromiseReq();
      return result;
    } catch (error) {
      return this.retryApi(PromiseReq, count);
    }
  }
}

export default PokeInfo;
