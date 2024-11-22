import PokeCard from "./PokeCard";
import Component from "../core/Component";
import "../styles/components/poke.css";
import { getPokeList } from "../service/api";
import { baseUrl, navigateTo } from "../router";

class PokeList extends Component {
  isUpdateList = true;
  nextOffest = 0;

  // 템플릿을 반환하는 함수
  template() {
    return `<ul class="poke_list"></ul>`;
  }

  // 컴포넌트가 마운트될 때 호출되는 함수
  mounted() {
    if (this.$props.pokets) {
      this.renderList(this.$props.pokets);
      window.addEventListener(
        "scroll",
        this.throttle(this.infiniteScroll.bind(this), 200)
      );
    }
  }

  // 포켓몬 리스트를 렌더링하는 함수
  renderList(list = [], nextOffest = 0) {
    const $pokeList = document.querySelector(".poke_list");
    list.map((pokemon, idx) => {
      new PokeCard($pokeList, {
        pokemon: { ...pokemon, pokemonId: nextOffest + idx + 1 },
      });
    });
  }

  // 이벤트를 설정하는 함수
  setEvent() {
    const { goDetailPage } = this;
    // @event Delegation
    this.addEvent("click", ".pokemon_card_container", (e) => {
      goDetailPage(e.target.closest("[data-pokemon-id]").dataset.pokemonId);
    });
  }

  // 상세 페이지로 이동하는 함수
  goDetailPage(id) {
    navigateTo(`${baseUrl}/${id}`);
  }

  // 스크롤 이벤트를 제한하는 함수
  throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  // 무한 스크롤을 처리하는 함수
  async infiniteScroll() {
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.clientHeight;
    const paddingBottom = 100;
    if (currentScroll + windowHeight + paddingBottom >= bodyHeight) {
      if (this.isUpdateList) {
        this.isUpdateList = false;
        this.nextOffest += 30;
        const data = await getPokeList(this.nextOffest, 30);
        this.renderList(data.results, this.nextOffest);
        this.isUpdateList = true;
      }
    }
  }
}

export default PokeList;
