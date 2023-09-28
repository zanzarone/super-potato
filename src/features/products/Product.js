import React, { useState } from "react";
import style from "../../assets/styles/Products.module.scss";
import Popup from "../../components/Popup";
import { useNavigate } from "react-router-dom";

const platformsKeys = ["Android", "iOS", "Mac", "Win", "Hardware", "Web"];
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
  clearDataOnLeave = true,
}) => {
  const [name, setName] = useState(initName);
  const [value, setValue] = useState(initValue);
  const [status, setStatus] = useState(initStatus);
  const [description, setDescription] = useState(initDescr);
  const [storeId, setStoreId] = useState(initStoreId);
  const [platform, setPlatform] = useState(initPlatform);

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [somethingChanged, setChanged] = useState(false);

  const navigate = useNavigate();

  const onNameChanged = (e) => {
    setName(e.target.value);
    setChanged(true);
  };
  const onValueChanged = (e) => {
    setValue(e.target.value);
    setChanged(true);
  };
  const onStatusChanged = (e) => {
    setStatus(Number(e.target.value));
    setChanged(true);
  };
  const onDescriptionChanged = (e) => {
    setDescription(e.target.value);
    setChanged(true);
  };
  const onStoreIdChanged = (e) => {
    setStoreId(e.target.value);
    setChanged(true);
  };
  const onPlatformChanged = (e) => {
    setPlatform(e.target.value);
    setChanged(true);
  };

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
    if (clearDataOnLeave) {
      setName("");
      setValue("");
      setStatus("");
      setDescription("");
      setStoreId("");
      setPlatform("");
    }
    setSuccess("Hooray! Product added");
    setTimeout(() => {
      setSuccess();
      navigate("/products");
    }, 1000);
  };

  const onCanceledClicked = () => {
    navigate("/products");
  };

  const canSave =
    [name, value, description].every(Boolean) &&
    status !== "" &&
    platform !== "";

  return (
    <div className={style.addProdContent}>
      <article className="card">
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
              <button
                disabled={!canSave || !somethingChanged}
                onClick={onSaveProductClicked}
              >
                Save
              </button>
              <button
                className="danger"
                disabled={isLoading}
                onClick={onCanceledClicked}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </article>
      {success && (
        <Popup title="Success" message={success} classType="successBg" />
      )}
      {error && <Popup title="Error" message={error} classType="dangerBg" />}
    </div>
  );
};

export default Product;
