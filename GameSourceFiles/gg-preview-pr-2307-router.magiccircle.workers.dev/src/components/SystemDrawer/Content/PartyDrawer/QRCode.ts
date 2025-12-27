// Patched QRCode component to allow a string for the `size` prop.
// It does actually work with strings (e.g. 90%) but the type definitions don't allow it.

// We import the original QRCodeSVG component.
import { QRCodeSVG as BaseQRCodeSVG } from 'qrcode.react';

// We then get the properties of the BaseQRCodeSVG component
// using React.ComponentProps. This gives us all the props that
// BaseQRCodeSVG accepts, which we save as BaseQRCodeSVGProps.
type BaseQRCodeSVGProps = React.ComponentProps<typeof BaseQRCodeSVG>;

// We want to extend BaseQRCodeSVGProps to allow a string for the `size` prop.
// First, we use the Omit utility to get a type with all properties of
// BaseQRCodeSVGProps except 'size'. Then, we add back a 'size' property that
// can be either a string or a number. This results in the ExtendedQRCodeSVGProps.
type ExtendedQRCodeSVGProps = Omit<BaseQRCodeSVGProps, 'size'> & {
  size?: string | number;
};

// We now create a new component, QRCode, which is the BaseQRCodeSVG but
// as a functional component that accepts ExtendedQRCodeSVGProps. This essentially
// 'patches' BaseQRCodeSVG to accept a string for the `size` prop without altering
// the original component.
const QRCode = BaseQRCodeSVG as React.FC<ExtendedQRCodeSVGProps>;

// Finally, we export our new QRCode component.
export default QRCode;
