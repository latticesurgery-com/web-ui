/** @jsxImportSource @emotion/react */
import { Box } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { PatchType, Orientation, EdgeType, ActivityType } from "lib/slices"

import type { VisualArrayCell } from "lib/slices"

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

type CellViewerProps = {
    cell: VisualArrayCell
    cell_font_size: number
    row_idx: number
    col_idx: number
}

const CellViewer = ({ cell, cell_font_size, row_idx, col_idx }: CellViewerProps) => {
    const cellFontSize = (cell: VisualArrayCell) =>
        cell.text.length > 20
            ? cell_font_size
            : cell.text.length > 7
            ? `${cell_font_size * 1.3}`
            : `${cell_font_size * 2}`

    return (
        <Box
            shadow="sm"
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
                      } 1%, transparent 90%)
                          `
                  }`}
            `}
        >
            <Box color="#686c6d" fontSize={`${cell_font_size}`}>
                ({row_idx},{col_idx})
            </Box>
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
