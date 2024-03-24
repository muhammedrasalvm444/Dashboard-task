"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import styles from "./uploadPage.module.css";
import Image from "next/image";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IoIosClose } from "react-icons/io";

const UploadPage = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Initialize selected tags for each row to an empty array
  const [selectedTagsMap, setSelectedTagsMap] = useState(() => {
    const initialSelectedTags = {};
    csvData.forEach((row) => {
      initialSelectedTags[row.id] = [];
    });
    return initialSelectedTags;
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const csvText = reader.result;
      const parsedCsv = Papa.parse(csvText, { header: true });
      setCsvData(parsedCsv.data);
      setSelectedFile(file);
      const initialSelectedTags = {};
      parsedCsv.data.forEach((row) => {
        initialSelectedTags[row.id] = [];
      });
      setSelectedTagsMap(initialSelectedTags);
    };

    reader.readAsText(file);
  };

  const handleChange = (e, rowId) => {
    setSelectedTagsMap((prevState) => ({
      ...prevState,
      [rowId]: e.target.value,
    }));
  };
  const removeTag = (rowId, tagIndex) => {
    setSelectedTagsMap((prevState) => ({
      ...prevState,
      [rowId]: prevState[rowId].filter((_, index) => index !== tagIndex),
    }));
  };

  return (
    <div style={{ maxWidth: "80vw" }}>
      <h2 className={styles.title}>Upload CSV</h2>

      <div className={styles.uploadPage}>
        <div className={styles.uploadFileSection}>
          <div className={styles.uploadImageSection}>
            <div className={styles.imageContainer}>
              <Image
                src="/excel.png"
                width={30}
                height={25}
                alt="excel"
                className={styles.image}
              />
              {!selectedFile ? (
                <p>
                  Drop your excel sheet here or <span>browse</span>
                </p>
              ) : (
                <div>
                  <p>{selectedFile?.name}</p>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "red",
                      marginTop: "10px",
                    }}
                    onClick={() => setSelectedFile(null)}
                  >
                    Remove
                  </p>
                </div>
              )}
            </div>
          </div>
          <label className={styles.uploadButton}>
            <input
              type="file"
              className="custom-file-input"
              accept=".csv"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      {csvData.length > 0 && (
        <div className={styles.table}>
          <h2 style={{ margin: "50px 0px" }}>Uploads</h2>
          <div className={styles?.tableContainer}>
            <table className={styles?.tabledata}>
              <thead>
                <tr>
                  {Object.keys(csvData[0]).map((header, index) => (
                    <th key={index} className={styles.tableheader}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 5).map((row, rowIndex) => {
                  return (
                    <tr key={rowIndex} className={styles?.bodytrtag}>
                      <td style={{ textAlign: "center", color: "#605bff" }}>
                        {row?.id}
                      </td>
                      <td style={{ textAlign: "center", color: "#605bff" }}>
                        {row?.links}
                      </td>
                      <td style={{ textAlign: "center", color: "#605bff" }}>
                        {row?.prefix}
                      </td>
                      <td style={{ textAlign: "center", color: "#605bff" }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                          <InputLabel id={`select-tags-label-${row.id}`}>
                            Select tags
                          </InputLabel>
                          <Select
                            labelId={`select-tags-label-${row.id}`}
                            id={`select-tags-${row.id}`}
                            value={selectedTagsMap[row.id]}
                            label="Select tags"
                            onChange={(e) => handleChange(e, row.id)}
                            multiple
                            sx={{ width: "150px" }} // Adjust the width as needed
                          >
                            {row["select tags"].split(",").map((tag, index) => (
                              <MenuItem key={index} value={tag.trim()}>
                                {tag.trim()}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </td>
                      <td
                        style={{
                          display: "grid",
                          gap: "4px",
                          gridTemplateColumns: "repeat(3, 1fr)",
                        }}
                      >
                        {selectedTagsMap[row.id].map((item, index) => (
                          <p key={index} className={styles?.ptag}>
                            {item}
                            <IoIosClose
                              style={{ fontSize: "18px", cursor: "pointer" }}
                              onClick={() => removeTag(row.id, index)}
                            />
                          </p>
                        ))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
