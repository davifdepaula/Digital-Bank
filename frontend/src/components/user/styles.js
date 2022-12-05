import styled from "styled-components"


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
    justify-content: center;
    align-items: center;
    border: 1px solid;
    border-radius: 10px;
    padding: 10px;
    margin: 20px auto;
    gap: 15px;


    div, button, input {
        font-size: 20px;
    }

    .inOut, .accountManage, form  {
        display: flex;
        gap: 10px;
    }

    button {
        border-radius: 5px;
    }

    .transferInputs {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 5px;
    }

    .transferInputs label{
        display: flex;
        justify-content: space-evenly;
        gap: 5px;
        align-items: center;       
    }

    .transferInputs label:nth-child(1){
        margin-left: 8px;      
    }

}

`