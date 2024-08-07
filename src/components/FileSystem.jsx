import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  Tree,
  MultiBackend,
  getDescendants,
  getBackendOptions
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { AddDialog } from "./AddDialog";
import { theme } from "../theme";
import styles from "../css/FileSystem.module.css";
import SampleData from "../sample_data.json";
import { update } from "lodash";
import { SelectedFileViewer } from "./SelectedFileViewer";

const getLastId = (treeData) => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  if (reversedArray.length > 0) {
    return reversedArray[0].id;
  }

  return 0;
};

function FileSystem(props) {
  const [treeData, setTreeData] = useState(SampleData);
  const handleSelect = (node) => props.setSelectedNode(node);

  function handleDrop(newTree) {
    setTreeData(newTree);
    updateServerJson(newTree);
  }
  const [open, setOpen] = useState(false);

  const updateServerJson = (newTree) => {
    console.log(newTree);
    // add code here to POST to firebase
  }

  const handleDelete = (id) => {
    const deleteIds = [
      id,
      ...getDescendants(treeData, id).map((node) => node.id)
    ];
    const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

    setTreeData(newTree);
    updateServerJson(newTree);
  };

  // const handleCopy = (id) => {
  //   const lastId = getLastId(treeData);
  //   const targetNode = treeData.find((n) => n.id === id);
  //   const descendants = getDescendants(treeData, id);
  //   const partialTree = descendants.map((node) => ({
  //     ...node,
  //     id: node.id + lastId,
  //     parent: node.parent + lastId
  //   }));

  //   setTreeData([
  //     ...treeData,
  //     {
  //       ...targetNode,
  //       id: targetNode.id + lastId
  //     },
  //     ...partialTree
  //   ]);
  //   updateServerJson([
  //     ...treeData,
  //     {
  //       ...targetNode,
  //       id: targetNode.id + lastId
  //     },
  //     ...partialTree
  //   ]);
  // };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = (newNode) => {
    const lastId = getLastId(treeData) + 1;

    setTreeData([
      ...treeData,
      {
        ...newNode,
        id: lastId
      }
    ]);
    updateServerJson([
      ...treeData,
      {
        ...newNode,
        id: lastId
      }
    ]);
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={MultiBackend} options={getBackendOptions()}>
        <div className={styles.app}>
          <div className={styles.addNode}>
            <Button onClick={handleOpenDialog} startIcon={<AddIcon />}>
              Add Node
            </Button>
            {open && (
              <AddDialog
                tree={treeData}
                onClose={handleCloseDialog}
                onSubmit={handleSubmit}
              />
            )}
          </div>
          <Tree
            tree={treeData}
            rootId={0}
            render={(node, options) => (
              <CustomNode
                node={node}
                {...options}
                onDelete={handleDelete}
                isSelected={node.id === props.selectedNode?.id}
                onSelect={handleSelect}
                // onCopy={handleCopy}
              />
            )}
            dragPreviewRender={(monitorProps) => (
              <CustomDragPreview monitorProps={monitorProps} />
            )}
            onDrop={handleDrop}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget
            }}
          />
        </div>
      </DndProvider>
    </ThemeProvider>
  );
}

export default FileSystem;
