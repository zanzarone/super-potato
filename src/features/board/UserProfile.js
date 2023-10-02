import React from "react";
import avatar from "../../assets/img/user.jpg";
import { Camera } from "@phosphor-icons/react";
import style from "../../assets/styles/UserProfile.module.scss";

const Language = ["English", "Italian"];

const UserProfile = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div
          style={{
            display: "flex",
            gap: ".7rem",
            // backgroundColor: "pink",
            width: "100%",
          }}
        >
          <div className={style.userAvatarContainer}>
            <img src={avatar} className={style.image}></img>
            <div className={style.changeAvatarOverlay}>
              <Camera color="#333" size={12} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // backgroundColor: "peru",
              width: "inherit",
              gap: 0,
              alignItems: "flex-start",
              // width: "100%",
            }}
          >
            <h2 style={{ margin: 0 }}> Samuele Scatena</h2>
            <h4 style={{ margin: 0, color: "gray" }}>@zanzarone</h4>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="key-value-grid">
          <div>
            <label>First name:</label>
            <input
              type="text"
              disabled
              // placeholder="e.g. 'X-Power'"
              required
              // value={name}
              // onChange={onNameChanged}
            />
          </div>
          <div>
            <label>Last name:</label>
            <input
              type="text"
              disabled
              // placeholder="e.g. 'X-Power'"
              required
              // value={name}
              // onChange={onNameChanged}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              disabled
              // placeholder="e.g. 'X-Power'"
              required
              // value={name}
              // onChange={onNameChanged}
            />
          </div>
          <div>
            <label>Last name:</label>
            <input
              type="text"
              disabled
              // placeholder="e.g. 'X-Power'"
              required
              // value={name}
              // onChange={onNameChanged}
            />
          </div>
          <div>
            <label>Country:</label>
            <select
              name="status"
              id="status"
              // value={status}
              // onChange={onStatusChanged}
            >
              <option value=""></option>
              {Language.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="card-footer"></div>
    </div>
  );
};

export default UserProfile;
