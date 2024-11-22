import Header from "../components/Header";
import PokeList from "../components/PokeList";
import Component from "../core/Component";
import { getPokeList } from "../service/api";

class Home extends Component {
  // 템플릿을 반환하는 함수
  template() {
    return `
    <header class='header'></header>
    <main>
      <section class='poke_list_container'></section>
    </main>
    `;
  }

  // 컴포넌트의 상태를 설정하는 함수
  setup() {
    this.$state = {};
    this.$getPokeList();
  }

  // 컴포넌트가 마운트될 때 호출되는 함수
  mounted() {
    const $header = document.querySelector(".header");
    const $pokeListContainer = document.querySelector(".poke_list_container");

    new Header($header, {
      header: $header,
    });
    new PokeList($pokeListContainer, {
      pokets: this.$state.pokets,
    });
  }

  // 포켓몬 리스트를 가져오는 함수
  async $getPokeList() {
    const data = await getPokeList();
    this.setState({ pokets: data.results });
  }
}

export default Home;
