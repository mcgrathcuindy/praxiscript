
import React, { useState } from "react";
import styles from "../css/SelectedFileViewer.module.css";

export const SelectedFileViewer = (props) => {

    return (
        <div className={styles.current}>
        <p>
          <span className={styles.currentLabel}>
            {props.node ? props.node.text : "Select A Drill"}
          </span>
        </p>
    </div>
    )
}