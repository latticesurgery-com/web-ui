import {
    Button,
    SliderTrack,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr"

type ZoomBarProps = {
    cellDimension: number
    setCellDimension: (num: number) => void
    cellFontSize: number
    setCellFontSize: (num: number) => void
}

const ZoomBar = ({
    cellDimension,
    setCellDimension,
    cellFontSize,
    setCellFontSize,
}: ZoomBarProps) => {
    const [sliderMax, sliderStep, defaultSliderValue] = [200, 10, 150]
    const [sliderValue, setSliderValue] = useState(150)
    console.log("Slider Val", sliderValue)
    const zoomChange = (direction: number) => {
        if (direction > 0) {
            if (sliderValue !== sliderMax) {
                setSliderValue(sliderValue + 10)
                setCellDimension(cellDimension + 10)
                setCellFontSize(cellFontSize + 1.5)
            }
        } else if (direction < 0) {
            if (sliderValue !== 0) {
                setSliderValue(sliderValue - 10)
                setCellDimension(cellDimension - 10)
                setCellFontSize(cellFontSize - 1.5)
            }
        }
    }
    return (
        <VStack p="1" gap="2">
            <Button onClick={() => zoomChange(1)}>
                <GrAddCircle size="25px" />
            </Button>
            <Button onClick={() => zoomChange(-1)}>
                <GrSubtractCircle size="25px" />
            </Button>
            <Slider
                h="250px"
                w="34px"
                mt="2"
                aria-label="slider-ex-1"
                orientation="vertical"
                value={sliderValue}
                defaultValue={defaultSliderValue}
                min={0}
                max={sliderMax}
                step={sliderStep}
                onChange={(val) => {
                    setSliderValue(val)
                    setCellDimension(val)
                    setCellFontSize(val/7.5)
                }}
            >
                <SliderTrack w="15px" rounded="xl">
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize="6" />
            </Slider>
        </VStack>
    )
}

export default ZoomBar
