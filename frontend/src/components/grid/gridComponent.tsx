import './gridComponent.css';
import type { GridComponentProps } from '../../utils/interfaces';

export const GridComponent = (gridValues: GridComponentProps) => {
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        {gridValues?.columns?.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {gridValues?.rows?.map((row) => (
                        <tr key={row}>
                        {row === "Activo" ? (
                            <>
                            <td>
                                <span className="status status--active">
                                    <span className="status-dot"></span>
                                    {row}
                                </span>
                            </td>
                            </>
                        ) : (
                            <td>{row}</td>
                        )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}