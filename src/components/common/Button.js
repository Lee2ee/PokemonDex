import Component from "../../core/Component";

class Button extends Component {
  // 템플릿을 반환하는 함수
  template() {
    const { content, className, disabled } = this.$props;
    return `
      <button class="${className ? className : "button"}" ${
      disabled ? "disabled" : ""
    }>
      ${content}
      </button>
    `;
  }

  // 이벤트를 설정하는 함수
  setEvent() {
    const { onClick, className } = this.$props;
    this.addEvent(
      "click",
      className ? `.${className.split(" ")[0]}` : "button"
    ),
      (e) => {
        e.preventDefault();
        onClick();
      };
  }
}

export default Button;
