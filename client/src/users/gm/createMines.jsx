import React from "react"

function CreateMinesForm(){
    return(
        <React.Fragment>
            <section>
        <h1 style={{ textAlign: "center" }}>Add Mine</h1>
        <form action="" className="form-head">
          <div>
            <label htmlFor="">Name</label>
            <input type="text" placeholder="enter your name" required/>
          </div>
          <div>
            <label htmlFor="">Lisence Number</label>
            <input type="password" placeholder="enter your password" required/>
          </div>
          <div>
            <label htmlFor="">Company</label>
            <select name="cars" id="cars">
              <option style={{backgroundColor: "black", color: "white"}} value="">Select Company</option>
              <option value="sccl">Singareni Collories</option>
              <option value="cil">Coal India Lmt</option>
              <option value="ccl">Central CoalField lmt</option>
            </select>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </section>
        </React.Fragment>
    )
}

export default CreateMinesForm