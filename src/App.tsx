import React, { useEffect, useState } from "react"
import "./index.css"

const baseApiUrl = "https://jsonplaceholder.typicode.com/users";
type User = {
  id:number;
  name:string;
  username:string;
  email:string;
}
export default function UserList(){
  const [user, setUser] = useState<User|null>(null);
  const [status, setStatus] = useState<"success"|"error"|"loading">("success");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  function handleInputUserIdChange(event:React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
    setCurrentUserId(event.target.value);
  }
  const apiUrl = `${baseApiUrl}/${currentUserId}`;
  async function handleSubmit(event:React.SubmitEvent<HTMLFormElement>){
    event.preventDefault();
    setStatus("loading");
    console.log("検索");
    const response = await fetchData<User>(apiUrl);
    if(response.status === "error"){
      setStatus("error");
      return;
    }
    setStatus("success");
    setUser(response.data);
  }
  
  return(
    <div>
      <SearchArea currentUserId={currentUserId} handleInputUserIdChange={handleInputUserIdChange} handleSubmit={handleSubmit}/>
      {status === "success" && <p>{user?.name} {user?.email}</p>}
      {status === "error" && <p>ユーザーは見つかりませんでした</p>}
      {status === "loading" && <p>検索中</p>}
    </div>
  );
}
type SuccessResponse<T> = {
  status:"success";
  data:T;
}
type ErrorResponse = {
  status:"error";
  message:string;
}
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
async function fetchData<T>(apiUrl:string):Promise<ApiResponse<T>>{
  try{
    const response = await fetch(apiUrl);
    console.log(response.status);
    if(!response.ok){
      throw new Error(await response.text());
    }
    const data = await response.json() as T;
    return {status:"success", data};
  }
  catch(error){
    return {status:"error", message:String(error)};
  }
}
type SearchAreaProps = {
  currentUserId:string;
  handleInputUserIdChange:(event:React.ChangeEvent<HTMLInputElement, HTMLInputElement>)=>void;
  handleSubmit:(event:React.SubmitEvent<HTMLFormElement>)=>void;
}
function SearchArea({currentUserId, handleInputUserIdChange, handleSubmit}:SearchAreaProps){
  return(
    <form onSubmit={(event)=>handleSubmit(event)}>
      <div>
        <label htmlFor="">
          ユーザーID
        </label>
        <input
          type="number" onChange={(event)=>handleInputUserIdChange(event)} value={currentUserId}/>
      </div>
      <div>
        <button
          type="submit"
          className="cursor-pointer bg-gray-300 p-2"
        >
          検索
        </button>
      </div>
    </form>
  );
}