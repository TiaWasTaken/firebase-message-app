import "./detail.css"

const Detail = () => { 
  return (
    <div className ='detail'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      </div>
      <div className="info">

        <div className="option">
          <div className="title">
            <span>Chat Setings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Share photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="" />
                <span>Photo 1</span> 
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="" />
                <span>Photo 1</span> 
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>

            <div className="photoItem">
          <div className="photoDetail">
                <img src="./avatar.png" alt="" />
                <span>Photo 1</span> 
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="./avatar.png" alt="" />
                <span>Photo 1</span> 
              </div>
              <img src="./download.png" alt="" className="icon"/>
            </div>

          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
      </div>
    </div>
  )
}

export default Detail
