
import React, { useState } from "react";
import styles from "../css/SelectedFileViewer.module.css";

export const SelectedFileViewer = (props) => {
    console.log(props.node)
    return (
        <div className={styles.current}>
          {!props.node || props.node.droppable ?
            <span className={styles.currentLabel}>
              Select A Drill
            </span>
          : 
            <div>
              <span className={styles.currentLabel}>
                {props.node.text}
              </span>
              <hr></hr>
              <div className={styles.currentBody}>
                  <span>Description: <label>{props.node.data.description}</label></span>
                  <span>Materials: <label>{props.node.data.materials}</label></span>
                  <span>Duration: <label>{props.node.data.duration}</label></span>
                  <span>Tags: <label>{props.node.data.tags}</label></span>
              </div>
            </div>
          }
    </div>
    )
}