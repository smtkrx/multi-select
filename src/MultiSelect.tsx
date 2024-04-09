import React, { useEffect } from "react";
import Select, { components } from 'react-select';

var options: { label: string; value: string; image: string; episode:number }[] = [];

export default function AnimatedMulti() {

     useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character') //Api ile karakter bilgileri çekiliyor
           .then((response) => response.json())
           .then((data) => {
              console.log(data);
              data.results.forEach((element: { [x: string]: any; }) => {
                options.push({label:element.name, value:element.id, image:element.image, episode:Object.keys(element.episode).length}); //Options variable' i içerisine karakter bilgilerinin ilgili bölümleri yazılıyor.
              });
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, []);

    const Option = (props:any) => {
      const userInput = props?.selectProps?.inputValue || "";
      return (
        <components.Option {...props}>
          <div className="element-option" style={{display:"flex", justifyContent:"flex-start", position:"relative", marginLeft:"10px"}}>
        <div style={{width: "60px", height: "70px"}}>
        <img src={props?.data?.image} alt="element-image" style={{width:"100%", height:"100%", borderRadius:"15px"}} />
        </div>
        &emsp;
        <div>
        {props?.selectProps?.inputValue?.length
              ? props?.data?.label?.split(" ").length
                ? props?.data?.label
                    ?.split(" ")
                    .map((word: string) =>
                      word
                        .split("")
                        .map((w) => (userInput.includes(w.toLowerCase()) ? <b style={{color: "black"}}>{w}</b> : w)) //query icin yazilan sozcuk listelenen sonuclarda vurgulanıyor
                    )
                : props?.data?.label
              : props?.data?.label}
        <p></p>
        <span>{props?.data?.episode} Episodes</span>
        </div>
      </div>
          <div>
          </div>
        </components.Option>
      );
    };
    

    document.body.style.background = "url(https://images4.alphacoders.com/133/1335148.jpg)";

  return (
    <div style={{position: "relative", margin:"10% 0 0 25%", width:"50%"}}>
    <Select
      closeMenuOnSelect={false}
      components={{Option}}
      isMulti
      placeholder="Rick and Morty karakterlerini seç..."
      
      options={options}
      isClearable={true}
      styles={{
        menu:(base) => ({
          ...base,
          border: `0.5px solid grey`,
          borderRadius: '5px',
        }),
        option: (base) => ({
          ...base,
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#CFD8DC",
          borderRadius:"5px",
          color: 'white',
        }),
        multiValueRemove: (base) => ({
          ...base,
          backgroundColor: "#78909C",
          borderRadius:"5px",
          marginRight:"5px",
          width:"18px",
          height:"18px",
          marginTop:"4px",
        })
      }}
    />
    </div>
  );
}