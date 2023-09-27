import React, { useState } from "react";
import style from "./Products.module.scss";
import Popup from "../../components/Popup";

const platformsKeys = ["Android", "iOS", "Mac", "Win", "Hardware", "Cloud"];
const statusKeys = [
  { name: "Enabled", value: 1 },
  { name: "Disabled", value: 0 },
];

const Product = ({
  title,
  initName = "",
  initValue = "",
  initStatus = "",
  initDescr = "",
  initStoreId = "",
  initPlatform = "",
  isLoading,
  onAdd,
  onFinished,
  onCanceled,
}) => {
  const [name, setName] = useState(initName);
  const [value, setValue] = useState(initValue);
  const [status, setStatus] = useState(initStatus);
  const [description, setDescription] = useState(initDescr);
  const [storeId, setStoreId] = useState(initStoreId);
  const [platform, setPlatform] = useState(initPlatform);

  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const onNameChanged = (e) => setName(e.target.value);
  const onValueChanged = (e) => setValue(e.target.value);
  const onStatusChanged = (e) => {
    console.log("pippo", e.target.value);
    setStatus(Number(e.target.value));
  };
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onStoreIdChanged = (e) => setStoreId(e.target.value);
  const onPlatformChanged = (e) => setPlatform(e.target.value);

  const onSaveProductClicked = async () => {
    if (!canSave) {
      return;
    }
    const { error } = onAdd({
      name,
      value,
      status,
      description,
      storeId,
      platform,
    });
    if (error) {
      console.error("Failed to save the post", error);
      setError(`Failed to add product ${error}`);
      setTimeout(() => setError(), 3000);
      return;
    }
    setName("");
    setValue("");
    setStatus("");
    setDescription("");
    setStoreId("");
    setPlatform("");
    setSuccess("Hooray! Product added");
    setTimeout(() => {
      setSuccess();
      onFinished();
    }, 3500);
  };

  const onCanceledClicked = () => {
    onCanceled();
  };

  const canSave =
    [name, value, description].every(Boolean) &&
    status !== "" &&
    platform !== "";

  return (
    <div className={style.addProdContent}>
      <article className="card" style={{ width: "100%" }}>
        <div className="card-header">
          <div>
            <h3>{title}</h3>
          </div>
        </div>
        <div className="card-body">
          <div style={{ gap: "1rem" }}>
            <div className={style.addProdKeysGrid}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="e.g. 'X-Power'"
                  required
                  value={name}
                  onChange={onNameChanged}
                />
              </div>
              <div>
                <label>Value:</label>
                <input
                  type="number"
                  placeholder="e.g. '18000'"
                  required
                  value={value}
                  onChange={onValueChanged}
                />
              </div>
              <div>
                <label>Status:</label>
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={onStatusChanged}
                >
                  <option value=""></option>
                  {statusKeys.map((sec) => (
                    <option key={sec.value} value={sec.value}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  placeholder="e.g. 'X-Power'"
                  required
                  value={description}
                  onChange={onDescriptionChanged}
                />
              </div>
              <div>
                <label>Store Id:</label>
                <input
                  type="text"
                  placeholder="e.g. 'de.srm.x-power'"
                  value={storeId}
                  onChange={onStoreIdChanged}
                />
              </div>
              <div>
                <label>Platform:</label>
                <select
                  name="platforms"
                  id="platforms"
                  value={platform}
                  onChange={onPlatformChanged}
                >
                  <option value=""></option>
                  {platformsKeys.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={style.addProdButtonsDiv}>
              <button disabled={!canSave} onClick={onSaveProductClicked}>
                Save
              </button>
              <button
                className="fail"
                disabled={isLoading}
                onClick={onCanceledClicked}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </article>
      {success && <Popup title="Success" message={success} />}
      {/* {error && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            minWidth: 200,
            minHeight: 150,
            borderRadius: 8,
            backgroundColor: "crimson",
            display: "flex",
            boxShadow:
              "0 3px 3px 0 rgba(#000, 0.05), 0 5px 15px 0 rgba(#000, 0.05)",
            //   padding: "0 .5rem",
          }}
        >
          <div style={{ margin: ".5rem" }}>
            <span style={{ color: "snow" }}>Error</span>
            <small style={{ color: "snow" }}>{error}</small>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Product;
