import React, { useState } from 'react';
import '../styles/DateInput.scss';
import axios from 'axios';

function DateInput() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setPdfUrl(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/generate_report/', {
        start_date: dateFrom,
        end_date: dateTo,
      });

      // const pd = "JVBERi0xLjQKJZOMi54gUmVwb3J0TGFiIEdlbmVyYXRlZCBQREYgZG9jdW1lbnQgaHR0cDovL3d3dy5yZXBvcnRsYWIuY29tCjEgMCBvYmoKPDwKL0YxIDIgMCBSCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9CYXNlRm9udCAvSGVsdmV0aWNhIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMSAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjMgMCBvYmoKPDwKL0NvbnRlbnRzIDcgMCBSIC9NZWRpYUJveCBbIDAgMCA1OTUuMjc1NiA4NDEuODg5OCBdIC9QYXJlbnQgNiAwIFIgL1Jlc291cmNlcyA8PAovRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXQo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNCAwIG9iago8PAovUGFnZU1vZGUgL1VzZU5vbmUgL1BhZ2VzIDYgMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9BdXRob3IgKFwoYW5vbnltb3VzXCkpIC9DcmVhdGlvbkRhdGUgKEQ6MjAyNDExMTMxNDU2MzQrMDUnMDAnKSAvQ3JlYXRvciAoXCh1bnNwZWNpZmllZFwpKSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyNDExMTMxNDU2MzQrMDUnMDAnKSAvUHJvZHVjZXIgKFJlcG9ydExhYiBQREYgTGlicmFyeSAtIHd3dy5yZXBvcnRsYWIuY29tKSAKICAvU3ViamVjdCAoXCh1bnNwZWNpZmllZFwpKSAvVGl0bGUgKFwoYW5vbnltb3VzXCkpIC9UcmFwcGVkIC9GYWxzZQo+PgplbmRvYmoKNiAwIG9iago8PAovQ291bnQgMSAvS2lkcyBbIDMgMCBSIF0gL1R5cGUgL1BhZ2VzCj4+CmVuZG9iago3IDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDk5Mgo+PgpzdHJlYW0KR2F0PSlEL1wsXiZIOXRZXDhVW1tSYDlVdG0sT3NEUm9FKmNRVG5qaiNKPClVWlExSWtvZkpXUy1tRSolNVFQdVpwWTlpOUYlN0BrKFwsaFchVmZSLmgjZFpqNXVAX1VKY3BzJFwxXTFZLUReUCUvO0lBI0ppb1tnR1FJdUAmKlcqWGNdXDo9Z0Mvc09Jb2woLE1WTG9iJXBXIjhFW3AiKFhkLT5lK1VVZWdNaVpwRCdZZ0A6aktlYSZmQlxDY3ItSEFdY146NTVdUk9AJENcYF8kWUk4L0RoTXBaU2RVNVBNZUUmXCRPZ2tvMjVtVmY/ZDBZRDZgPTZLZjAhKUo3bjs4Ki5BaWxyPDE6VC9nXFp1RVNWODk7T1hJODROM2coLzhVKDU6RkJFUlVLUVdDL2UvTTElRS80R2xOSmkmPkUkY0hSWWdrVVdpUEEjSWFYTC1NbkFKaD9hJFU1OFhobEhsL1dTJS9cU3J1dS9DRlhOTWJSJjJZJy9KLnMwNlRVMTttaSg7amFVMHBUcDJhMysucys/PltcZ3RwVl1gVVg7T19HY1ttImdGR1czMmVLT1FTcUZDVipPVmhJWjosTkhqVnVZcClILUp1My9NKzxgZyhlQUhlJHI/clZJZFkhQCtgblU6MTs/NVdvcVxYTXAqKGg6bzAwIk5kUV5TMi4kYTMucGg3PEZrbz5eLUk/XVQ6Y3RMKFZ0cDgoMjB0Km08SEhvPyIsNS5dInRHUXU0SmNaPlw9MjArWXVpW2U2Z1VbSENYa1phYlJYdEBqPXFrSUNYJU0oLzNHUE8xYT46J2BTI3IvVlRISV1da29xcW5xTEFlY19dNyFvakEzVCVIVzBvIlM3PHRtJSQ9Pk5eNmYuPitCWl0zQWtsQDJyaTgpWnNDUi5kIjxESS5WZTJjLCpcP0lTUEJxXjwrMV1rIkY2b0QwPWtcRVkmJWxXZzpcTSJBWlY6XGdkZSxbaXQjUVVwaV1zcllyNmU/Qj5OaiJTVDdHV05KMGY6XDdESTxfMEZAQFklcEg6Zl9fXzRWOC0+LlU7PjVkUiZmZWspKVpecWNcIj1oUDclRmBBaz0oakxDIzZbZFNYQVYlMjNMRCVIKXU6LE5eRCVpL0xxcUNgZXJgSkw9c3U8PHI2O1UnaVRgaCRqbCM9Pjc/dVhMIXRPaEdwPHJDJiRPb15TcmZOVzJDXHFUXU5NREtAZiMuI0IibEgkdGlJUDVXSlgjIVAoNGhmbyJgQGgmUCQ0LmtASjs0YDRCalwnNChoRVEndEE/Ly1tVW0xTVgrcCssc09DNytvJF9cbiQ2fj5lbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA4CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDA3MyAwMDAwMCBuIAowMDAwMDAwMTA0IDAwMDAwIG4gCjAwMDAwMDAyMTEgMDAwMDAgbiAKMDAwMDAwMDQxNCAwMDAwMCBuIAowMDAwMDAwNDgyIDAwMDAwIG4gCjAwMDAwMDA3NjUgMDAwMDAgbiAKMDAwMDAwMDgyNCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9JRCAKWzxmMDU0ZWZiYjQxMjM4MTAxZDg1M2NhNjk3NTY3YTJkMD48ZjA1NGVmYmI0MTIzODEwMWQ4NTNjYTY5NzU2N2EyZDA+XQolIFJlcG9ydExhYiBnZW5lcmF0ZWQgUERGIGRvY3VtZW50IC0tIGRpZ2VzdCAoaHR0cDovL3d3dy5yZXBvcnRsYWIuY29tKQoKL0luZm8gNSAwIFIKL1Jvb3QgNCAwIFIKL1NpemUgOAo+PgpzdGFydHhyZWYKMTkwNgolJUVPRgo="

      // Assuming response.data contains the Base64 string
      if(response){   
      console.log(response)
      console.log(response.data.data.base_string)
      const base64String = response.data.data.base_string;
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      
    }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h1>Generate Report</h1>
      <hr style={{ width: '100%', margin: '0 auto', border: '1px solid gray' }} />
    <div className="row">
      {/* Date Picker Column (col-4) */}
      <div className="col-12 col-md-4">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white text-center">
            <h4>Select Date Range</h4>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="dateFrom" className="form-label">Date From:</label>
                <input
                  type="date"
                  id="dateFrom"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateTo" className="form-label">Date To:</label>
                <input
                  type="date"
                  id="dateTo"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Information Column (col-8) */}
      <div className="col-12 col-md-8 mt-4 mt-md-0">
        {!pdfUrl && (
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">About This Application</h5>
            </div>
            <div className="card-body">
              <p>
                Welcome to the "Report AI" application! This tool allows you to generate custom reports
                by selecting a date range. Simply choose the start and end dates, and our system will
                generate a PDF report for you.
              </p>
              <p>
                Before submitting, make sure that the date range is accurate, as it will determine
                the data included in the generated report.
              </p>
              <p>
                Once you submit the dates, the system will process the request and provide a PDF
                preview of the report based on your selected criteria.
              </p>
              <hr />
              <p><strong>Instructions:</strong></p>
              <ul>
                <li>Select the "Date From" and "Date To" fields.</li>
                <li>Ensure the dates are within a valid range.</li>
                <li>Click "Submit" to generate the report.</li>
              </ul>
            </div>
          </div>
        )}

        {/* PDF Display Section */}
        {pdfUrl && (
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">PDF Preview</h5>
            </div>
            <div className="card-body p-0">
              {error && (
                <div className="alert alert-danger">
                  <strong>Error:</strong> {error}
                </div>
              )}
              <iframe
                src={pdfUrl}
                title="PDF Viewer"
                className="w-100 border-0"
                style={{ height: '600px' }}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>



  );
}

export default DateInput;