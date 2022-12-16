export { default } from './Settings';.wrapper {
    width: 100%;
    height: 100vh;
    background-color: var(--bg-color);
    display: flex;
    justify-content: center;
}
.container {
    display: flex;
    justify-content: space-between;
    margin-top: var(--default-layout-header-height);
    width: 100vw;
    max-width: 1150px;
    // height: 90vh;
    padding: 16px 24px 10px 20px;
    background-color: var(--bg-color);
}
.left {
    border-radius: 8px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    width: 356px;
    // height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: var(--bg-color);
    box-shadow: rgb(0 0 0 / 6%) 0px 2px 8px;
}
.back-icon {
    position: absolute;
    top: 8px;
    width: 40px;
    height: 40px;
    padding-top: 10px;
    border-radius: 100%;
    background-color: var(--bg-gray);
    cursor: pointer;
    transform: none;
    left: -56px;
    padding-left: 10px;
}
.nav {
    display: flex;
    height: 52px;
    padding: 14px 24px;
    align-items: center;
    cursor: pointer;
    font-size: 1.8rem;
    color: var(--text-color-black);
    font-weight: 600;
}
.nav.active {
    color: red;
}
.nav-icon {
    margin-right: 8px;
    font-size: 2.6rem;
}
.active {
    color: var(--primary);
}
// switch
.switch {
    display: flex;
    align-items: center;
    width: 44px;
    height: 24px;
    padding: 2px;
    background-color: var(--bg-gray);
    border-radius: 22px;
    position: relative;
}
.turn-on {
    position: relative;
    background-color: var(--tick-color);
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
    .switch-inner {
        position: absolute;
        left: calc(100% - 22px);
    }
}
.switch-inner {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: var(--bg-color);
    border-radius: 50%;
    left: 2px;
    box-shadow: rgb(0 0 0 / 15%) 0px 1px 2px;
    transition: all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
}
// right
.right {
    z-index: unset;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 728px;
    // height: 100%;
    background: var(--bg-color);
    box-shadow: rgb(0 0 0 / 6%) 0px 2px 8px;
    border-radius: 8px;
    background-color: white;
    margin-left: 16px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: var(--text-color-black);

    padding: 16px 24px 24px;
    overflow-y: scroll;
}
.title {
    font-size: 24px;
    line-height: 32px;
    margin: 0 8px 20px;
    font-weight: 700;
    color: #000;
}
.body {
    padding: 0px 0 16px 16px;
}
.group {
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(22, 24, 35, 0.12);
}
.sub-title {
    font-size: 1.6rem;
    line-height: 24px;
    font-weight: 600;
    color: #161823;
    margin: 12px 0px 12px;
}
.option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        font-size: 1.4rem;
        margin-bottom: 4px;
        line-height: 22px;
        color: #161823;
    }
}
.description {
    font-size: 10px;
    line-height: 15px;
    color: rgba(22, 24, 35, 0.5);
    margin-right: 84px;
}