import {
    Button,
    SliderTrack,
    Slider,
    SliderMark,
    SliderFilledTrack,
    SliderThumb,
    VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr"
import "./Zoombar.css"

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
    const [sliderMax, sliderStep] = [200, 10]
    const [sliderValue, setSliderValue] = useState(150) // 150 corresponds to 100% zoom.
    const [sliderMoving, setSliderMoving] = useState(false)

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
        setSliderMoving(true)
        setTimeout(() => setSliderMoving(false), 1000)
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
                min={0}
                max={sliderMax}
                step={sliderStep}
                onChange={(val) => {
                    setSliderValue(val)
                    setSliderMoving(true)
                }}
                onChangeEnd={(val) => {
                    setCellDimension(val)
                    setCellFontSize(val / 7.5)
                    setTimeout(() => {
                        setSliderMoving(false)
                    }, 300)
                }}
            >
                <SliderMark
                    value={sliderValue}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-8"
                    ml="4"
                    w="12"
                    className={sliderMoving ? "fade-in" : "fade-out"}
                >
                    {Math.round(sliderValue * 0.6667)}%
                </SliderMark>
                <SliderTrack w="8px" rounded="xl">
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize="5" onClick={() => setSliderMoving(true)} />
            </Slider>
        </VStack>
    )
}

export default ZoomBar
