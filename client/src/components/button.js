import styled from 'styled-components';

export const ButtonContainer=styled.button`
text-transform:capitalize;
font-size:1.4rem;
background:transparent;
border:0.05rem solid var(--lightBlue);
border-color:${props=>
    props.cart?"var(--mainYellow)":"var(--lightBlue)"};
color:${props=>props.cart?"var(--mainYellow)":"var(--lightBlue)"};
border-radius:0.5rem;
padding:0.2rem 0.5rem;
cursor:pointer;
margin:0.2rem 0.5rem 0.2rem 0;
transition:all 0.5s ease-in-out;
&:hover{
    background:${props=>props.cart?"var(--mainYellow)":"var(--lightBlue)"};
    color:var(--mainBlue);
}
&:focus{
    outline:none;
}
`

export const MyButtonContainer=styled.button`
text-transform:capitalize;
font-size:1.4rem;
background:transparent;
border:0.05rem solid var(--lightBlue);
border-color:red;
color:${props=>props.cart?"var(--mainYellow)":"var(--lightBlue)"};
border-radius:0.5rem;
padding:0.2rem 0.5rem;
cursor:pointer;
margin:0.2rem 0.5rem 0.2rem 0.5rem;
transition:all 0.5s ease-in-out;
&:hover{
    background:red;
    color:var(--mainBlue);
}
&:focus{
    outline:none;
}
`

export const LogoutButtonContainer=styled.button`
text-transform:capitalize;
font-size:1.4rem;
background:transparent;
border:0.05rem solid var(--lightBlue);
border-color:yellow;
color:${props=>props.cart?"var(--mainYellow)":"var(--lightBlue)"};
border-radius:0.5rem;
padding:0.2rem 0.5rem;
cursor:pointer;
margin-left:0.2rem 0.5rem 0.2rem 0.5rem;
transition:all 0.5s ease-in-out;
&:hover{
    background:yellow;
    color:var(--mainBlue);
}
&:focus{
    outline:none;
}
`

export const AdminButtonContainer=styled.button`
text-transform:capitalize;
font-size:1.4rem;
background:transparent;
border:0.05rem solid var(--lightBlue);
border-color:${props=>
    props.cart?"var(--mainYellow)":"var(--lightBlue)"};
color:${props=>props.cart?"var(--mainYellow)":"var(--lightBlue)"};
border-radius:0.5rem;
padding:0.2rem 0.5rem;
cursor:pointer;
margin-right:2px;
transition:all 0.5s ease-in-out;
&:hover{
    background:${props=>props.cart?"var(--mainYellow)":"var(--lightBlue)"};
    color:var(--mainBlue);
}
&:focus{
    outline:none;
}
`