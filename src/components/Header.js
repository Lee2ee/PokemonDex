import Component from "../core/Component";
import "../styles/components/header.css";
import logo from "../assets/main_logo.png";
import { baseUrl } from "../router";
import { navigateTo } from "../router";

class Header extends Component {
  // 템플릿을 반환하는 함수
  template() {
    return `
					<img src="${logo}" alt="logo" width="180" data-component="header-logo"/>
        `;
  }

  // 이벤트를 설정하는 함수
  setEvent() {
    this.addEvent("click", '[data-component="header-logo"]', () => {
      this.handleNavigateToDashboard();
    });
  }

  // 뒤로 가기 버튼을 처리하는 함수
  handleNavigateToBack() {
    history.back();
  }

  // 대시보드로 이동하는 함수
  handleNavigateToDashboard() {
    navigateTo(baseUrl);
  }
}

export default Header;
