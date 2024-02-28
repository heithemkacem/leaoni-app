import React, { useState, useMemo } from "react";

import { Viewer, Worker, ThemeContext } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { themePlugin } from "@react-pdf-viewer/theme";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import "./PDFViewer.css";

export default function PDFViewer() {
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);

  const fileType = ["application/pdf"];

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (event) => {
          setPdfFile(event.target.result);
        };
      } else {
        setPdfFile(null);
      }
    } else {
      console.log("please select");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else setViewPdf(null);
  };

  const themePluginInstance = themePlugin();
  const { SwitchThemeButton } = themePluginInstance;

  const [currentTheme, setCurrentTheme] = React.useState("light");
  const themeContext = useMemo(
    () => ({ currentTheme, setCurrentTheme }),
    [currentTheme, setCurrentTheme]
  );
  //   const newplugin = defaultLayoutPlugin({
  //     sidebarTabs: () => [],
  //   });

  const containerStyle = {
    height: "calc(100vh - 200px)", // Adjust the height as per your requirements
    overflow: "auto",
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="file" className="form-control" onChange={handleChange} />
        <button type="submit" className="btn brn-success">
          View PDF
        </button>
        <div className="pdf-conatiner" style={containerStyle}>
          <ThemeContext.Provider value={themeContext}>
            <div
              className={`rpv-core__viewer rpv-core__viewer--${currentTheme}`}
              style={{
                borderColor: currentTheme === "dark" ? "#454647" : "rgba(0, 0, 0, 0.3)",
                borderStyle: "solid",
                borderWidth: "1px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  backgroundColor: currentTheme === "dark" ? "#292929" : "#eee",
                  borderBottomColor: currentTheme === "dark" ? "#000" : "rgba(0, 0, 0, 0.1)",
                  borderBottomStyle: "solid",
                  borderBottomWidth: "1px",
                  display: "flex",
                  padding: ".25rem",
                }}
              >
                <SwitchThemeButton />
              </div>
              <div
                style={{
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  {viewPdf && (
                    <>
                      {" "}
                      <Viewer
                        fileUrl={viewPdf}
                        plugins={[themePluginInstance]}
                        theme={currentTheme}
                        defaultScale={0.75}
                      />{" "}
                    </>
                  )}
                  {!viewPdf && <>No PDF</>}
                </Worker>
                {/* <Viewer
                  defaultScale={0.75}
                  fileUrl={fileUrl}
                  plugins={[themePluginInstance]}
                  theme={currentTheme}
                /> */}
              </div>
            </div>
          </ThemeContext.Provider>
          {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {viewPdf && (
              <>
                {" "}
                <Viewer fileUrl={viewPdf} plugins={[newplugin]} />{" "}
              </>
            )}
            {!viewPdf && <>No PDF</>}
          </Worker> */}
        </div>
      </form>
    </div>
  );
}
