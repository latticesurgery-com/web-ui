/** @jsxImportSource @emotion/react */
import { Box } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { PatchType, Orientation, EdgeType, ActivityType } from "../lib/slices"
import { VisualArrayCell } from "../lib/slices"

type StylesMapType = {
    [key in Orientation | PatchType | EdgeType]: string
}

const styles_map: StylesMapType = {
    [PatchType.Qubit]: "darkkhaki",
    [PatchType.DistillationQubit]: "orchid",
    [PatchType.Ancilla]: "aquamarine",
    [Orientation.Top]: "top",
    [Orientation.Bottom]: "bottom",
    [Orientation.Left]: "left",
    [Orientation.Right]: "right",
    [EdgeType.Solid]: "solid",
    [EdgeType.SolidStiched]: "solid",
    [EdgeType.Dashed]: "dotted",
    [EdgeType.DashedStiched]: "dotted",
    [EdgeType.AncillaJoin]: "solid",
}

type StylesMapEdgeColorType = {
    [key in EdgeType]: string
}

const styles_map_edge_color: StylesMapEdgeColorType = {
    [EdgeType.Solid]: "black",
    [EdgeType.SolidStiched]: "#37beff",
    [EdgeType.Dashed]: "black",
    [EdgeType.DashedStiched]: "#37beff",
    [EdgeType.AncillaJoin]: "aquamarine",
}

type StylesMapActivityColorType = {
    [key in ActivityType]: string
}

const styles_map_activity_color: StylesMapActivityColorType = {
    [ActivityType.Unitary]: "#00baff",
    [ActivityType.Measurement]: "#ff0000",
}

const cellFontSize = (cell: VisualArrayCell) =>
    cell.text.length > 20 ? "14" : cell.text.length > 7 ? "18" : "30"

type CellViewerProps = {
    cell: VisualArrayCell
    row_idx: number
    col_idx: number
}

const CellViewer = ({ cell, row_idx, col_idx }: CellViewerProps) => {
    return (
        <Box
            css={css`
                height: 100%;
                width: 100%;
                vertical-align: middle;
                display: inline-block;
                border-width: 4pt;
                border-style: solid;
                text-align: center;

                ${cell !== null && cell.patch_type === PatchType.Ancilla
                    ? "border-color: white"
                    : "border-color: transparent"};

                ${cell !== null &&
                `background-color: ${styles_map[cell.patch_type]};
                  ${Object.keys(cell.edges)
                      .map((orientation_string: string) => {
                          const orientation = orientation_string as Orientation
                          const edge_type = cell.edges[orientation] as EdgeType

                          return `border-${styles_map[orientation]}-style: ${styles_map[edge_type]};
                      border-${styles_map[orientation]}-color: ${styles_map_edge_color[edge_type]};
                      `
                      })
                      .join("\n")};
                  ${
                      cell.activity !== null &&
                      `background-image: radial-gradient(${
                          styles_map_activity_color[cell.activity.activity_type]
                      } 7%, transparent 90%)
                          `
                  }`}
            `}
        >
            <span
                css={css`
                    color: #686c6d;
                `}
            >
                ({row_idx},{col_idx})
            </span>
            <br />
            <span>
                {cell?.text && (
                    <p className="qubit-state">
                        <span
                            css={css`
                                font-size: ${cellFontSize(cell)}px;
                            `}
                        >
                            <b>{cell.text}</b>
                        </span>
                    </p>
                )}
            </span>
        </Box>
    )
}

export default CellViewer
