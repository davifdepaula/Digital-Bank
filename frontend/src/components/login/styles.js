import styled from "styled-components";


export const Container = styled.div`
    display:flex;
    margin:20px auto;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 10px;
`

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-radius: 10px;
    padding: 10px;
    margin: 20px auto;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap:10px;
        margin-bottom: 10px;
    }

    a {
        text-decoration: none;
        color: #000000;
    }
`