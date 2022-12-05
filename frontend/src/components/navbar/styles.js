import styled from "styled-components"



export const Container = styled.div`
    border-bottom: 1px solid;
    height: 50px;
    background: #5e56f5;

    .app {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: auto;
        width: 50%;
        margin: 0 auto;
        padding-top: 10px;
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
    }

    .logoBank{
        display:flex;
        align-items: center;
        gap: 5px;
    }

    .logoBank .imageBank {
        font-size: 30px;
    }

    button{
        background: none;
        border-radius: 5px;
        cursor:pointer;
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
    }

    div {
        cursor: pointer;
    }

`