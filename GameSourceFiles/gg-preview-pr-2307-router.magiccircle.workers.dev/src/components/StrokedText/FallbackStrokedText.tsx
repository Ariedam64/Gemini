import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { chakra } from '@chakra-ui/react';
import { StrokedTextProps } from './StrokedTextProps';

const StrokedText: React.FC<StrokedTextProps> = ({
  color = 'MagicWhite',
  strokeColor = 'MagicBlack',
  strokeWidth = 4,
  shadowHeight = 'auto',
  children,
  ...rest
}) => {
  const svgTextRef = useRef<SVGTextElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [resizeToggle, setResizeToggle] = useState<boolean>(false);

  // When the app's size changes (e.g., when the user minimizes or maximizes the app within Discord),
  // it becomes necessary to recalculate the width and height of the SVG.
  // To achieve this, we set up a ResizeObserver that toggles the state variable "resizeToggle" whenever
  // such a size change occurs. This state variable is then used as a dependency in the useLayoutEffect below.
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setResizeToggle((prev) => !prev);
    });

    const appWrapper = document.getElementById('AppWrapper');
    if (appWrapper) {
      resizeObserver.observe(appWrapper);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Shrink the SVG element to fit its contents
  useLayoutEffect(() => {
    if (!svgRef.current || !svgTextRef.current) return;
    const svg = svgRef.current;
    const text = svgTextRef.current;

    // Create a clone of the text SVG element and use it to obtain the bbox dimensions.
    // Directly using getBBox() on the original text SVG sometimes results in incorrect dimensions,
    // particularly in Discord where the entire app is embedded within an iframe.
    // This behavior, while not fully understood, likely relates to the iframe's rendering context.
    const clone = text.cloneNode(true) as SVGTextElement;
    clone.style.visibility = 'hidden';
    svg.appendChild(clone);
    const { width, height } = clone.getBBox();
    svg.removeChild(clone);

    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());
  }, [children, strokeWidth, resizeToggle]);

  if (shadowHeight === 'auto') {
    shadowHeight = strokeWidth * 0.667;
  }

  // We use a unique filter ID to avoid issues with SVG filters.
  const filterId = `strokeshadow-height-${shadowHeight}`;

  return (
    <chakra.svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      paintOrder="stroke fill"
      overflow="visible"
      fill={color}
      stroke={strokeColor}
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      // More closely mimic HTML text rendering...
      // https://observablehq.com/@julesblm/svg-dominant-baseline-alignment-baseline-attributes
      dominantBaseline="mathematical"
      {...rest}
    >
      <defs>
        {/* This filter adds a shadow to the text */}
        <filter id={filterId} x="-50%" y="-50%" width="300%" height="300%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy={shadowHeight} />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0" />
          {/* Set shadow color */}
          <feFlood floodColor="rgba(0,0,0,0.25)" result="floodOut" />
          <feComposite
            in="floodOut"
            in2="blurOut"
            operator="in"
            result="shadowOut"
          />

          <feBlend in="SourceGraphic" in2="shadowOut" mode="normal" />
        </filter>
      </defs>
      <chakra.text
        ref={svgTextRef}
        filter={`url(#${filterId})`}
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {children}
      </chakra.text>
    </chakra.svg>
  );
};

export default StrokedText;
