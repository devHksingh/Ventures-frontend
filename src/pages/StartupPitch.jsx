import React, { useState, useCallback } from 'react';
import { Upload, X, Play, Eye, DollarSign, Percent, FileText, Image, Video } from 'lucide-react';

const Pitch = () => {
  const [idea, setIdea] = useState({
    title: '',
    briefDescription: '',
    description: '',
    image: null,
    shortVideo: null,
    longVideo: null,
    fundingAmount: '',
    equityStake: '',
    additionalDocuments: []
  });

  const [errors, setErrors] = useState({});
  const [dragOver, setDragOver] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIdea({ ...idea, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateFile = (file, type) => {
    const errors = [];
    
    if (type === 'image') {
      if (!file.type.startsWith('image/')) {
        errors.push('File must be an image');
      }
      if (file.size > 10 * 1024 * 1024) {
        errors.push('Image size must be less than 10 MB');
      }
    } else if (type === 'shortVideo') {
      if (!file.type.startsWith('video/')) {
        errors.push('File must be a video');
      }
      if (file.size > 50 * 1024 * 1024) {
        errors.push('Short video size must be less than 50 MB');
      }
    } else if (type === 'longVideo') {
      if (!file.type.startsWith('video/')) {
        errors.push('File must be a video');
      }
      if (file.size > 200 * 1024 * 1024) {
        errors.push('Long video size must be less than 200 MB');
      }
    }
    
    return errors;
  };

  const validateVideoDuration = (file, type, callback) => {
    const videoElement = document.createElement('video');
    videoElement.preload = 'metadata';
    videoElement.onloadedmetadata = () => {
      window.URL.revokeObjectURL(videoElement.src);
      const maxDuration = type === 'shortVideo' ? 60 : 1800; // 1 min or 30 min
      
      if (videoElement.duration > maxDuration) {
        const maxTime = type === 'shortVideo' ? '1 minute' : '30 minutes';
        callback(`${type === 'shortVideo' ? 'Short' : 'Long'} video duration must be ${maxTime} or less`);
      } else {
        callback(null);
      }
    };
    videoElement.onerror = () => {
      callback('Invalid video file');
    };
    videoElement.src = URL.createObjectURL(file);
  };

  const handleFileChange = (file, type) => {
    if (!file) return;

    const validationErrors = validateFile(file, type);
    if (validationErrors.length > 0) {
      setErrors({ ...errors, [type]: validationErrors[0] });
      return;
    }

    if (type === 'shortVideo' || type === 'longVideo') {
      validateVideoDuration(file, type, (error) => {
        if (error) {
          setErrors({ ...errors, [type]: error });
        } else {
          setIdea({ ...idea, [type]: file });
          setErrors({ ...errors, [type]: '' });
        }
      });
    } else if (type === 'image') {
      setIdea({ ...idea, image: file });
      setErrors({ ...errors, image: '' });
    } else if (type === 'documents') {
      setIdea({ 
        ...idea, 
        additionalDocuments: [...idea.additionalDocuments, file] 
      });
    }
  };

  const handleDragOver = useCallback((e, type) => {
    e.preventDefault();
    setDragOver({ ...dragOver, [type]: true });
  }, [dragOver]);

  const handleDragLeave = useCallback((e, type) => {
    e.preventDefault();
    setDragOver({ ...dragOver, [type]: false });
  }, [dragOver]);

  const handleDrop = useCallback((e, type) => {
    e.preventDefault();
    setDragOver({ ...dragOver, [type]: false });
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileChange(files[0], type);
    }
  }, [dragOver, idea]);

  const removeFile = (type, index = null) => {
    if (type === 'additionalDocuments' && index !== null) {
      const newDocs = idea.additionalDocuments.filter((_, i) => i !== index);
      setIdea({ ...idea, additionalDocuments: newDocs });
    } else {
      setIdea({ ...idea, [type]: null });
    }
    setErrors({ ...errors, [type]: '' });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!idea.title.trim()) newErrors.title = 'Title is required';
    if (!idea.briefDescription.trim()) newErrors.briefDescription = 'Brief description is required';
    if (!idea.description.trim()) newErrors.description = 'Full description is required';
    if (!idea.fundingAmount || idea.fundingAmount <= 0) newErrors.fundingAmount = 'Valid funding amount is required';
    if (!idea.equityStake || idea.equityStake <= 0 || idea.equityStake > 100) newErrors.equityStake = 'Equity stake must be between 1-100%';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate submission
    alert('Idea submitted successfully! (This would normally save to Firebase)');
    
    // Reset form
    setIdea({
      title: '',
      briefDescription: '',
      description: '',
      image: null,
      shortVideo: null,
      longVideo: null,
      fundingAmount: '',
      equityStake: '',
      additionalDocuments: []
    });
    setErrors({});
    setShowPreview(false);
  };

  const DropZone = ({ type, accept, children, className = "" }) => (
    <div
      className={`drop-zone ${dragOver[type] ? 'drag-over' : ''} ${className}`}
      onDragOver={(e) => handleDragOver(e, type)}
      onDragLeave={(e) => handleDragLeave(e, type)}
      onDrop={(e) => handleDrop(e, type)}
      onClick={() => document.getElementById(`file-${type}`).click()}
    >
      {children}
      <input
        id={`file-${type}`}
        type="file"
        accept={accept}
        onChange={(e) => handleFileChange(e.target.files[0], type)}
        style={{ display: 'none' }}
      />
    </div>
  );

  const FilePreview = ({ file, type, onRemove, index = null }) => (
    <div className="file-preview">
      <div className="file-info">
        {type === 'image' && <Image className="file-icon" />}
        {(type === 'shortVideo' || type === 'longVideo') && <Video className="file-icon" />}
        {type === 'documents' && <FileText className="file-icon" />}
        <div className="file-details">
          <span className="file-name">{file.name}</span>
          <span className="file-size">{formatFileSize(file.size)}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onRemove(type, index)}
        className="remove-file-btn"
      >
        <X size={16} />
      </button>
    </div>
  );

  const PreviewModal = () => (
    <div className="preview-modal">
      <div className="preview-content">
        <div className="preview-header">
          <h3>Preview Your Pitch</h3>
          <button onClick={() => setShowPreview(false)} className="close-btn">
            <X size={20} />
          </button>
        </div>
        
        <div className="preview-body">
          <div className="preview-section">
            <h4>{idea.title}</h4>
            <p className="brief-desc">{idea.briefDescription}</p>
            
            {idea.image && (
              <div className="preview-media">
                <img src={URL.createObjectURL(idea.image)} alt="Pitch" className="preview-image" />
              </div>
            )}
            
            <div className="description-preview">
              <h5>Description</h5>
              <p>{idea.description}</p>
            </div>
            
            <div className="funding-preview">
              <div className="funding-item">
                <DollarSign size={16} />
                <span>Funding Required: ${parseInt(idea.fundingAmount).toLocaleString()}</span>
              </div>
              <div className="funding-item">
                <Percent size={16} />
                <span>Equity Offered: {idea.equityStake}%</span>
              </div>
            </div>
            
            {(idea.shortVideo || idea.longVideo) && (
              <div className="video-preview">
                <h5>Videos</h5>
                {idea.shortVideo && <p>Short Video: {idea.shortVideo.name}</p>}
                {idea.longVideo && <p>Long Video: {idea.longVideo.name}</p>}
              </div>
            )}
          </div>
        </div>
        
        <div className="preview-footer">
          <button onClick={() => setShowPreview(false)} className="btn-secondary">
            Edit
          </button>
          <button onClick={handleSubmit} className="btn-primary">
            Submit Pitch
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pitch-container">
      <div className="pitch-header">
        <h2>💡 Create Your Pitch</h2>
        <p>Share your innovative idea with potential investors</p>
      </div>

      <div className="pitch-form">
        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label>Project Title *</label>
            <input
              type="text"
              name="title"
              value={idea.title}
              onChange={handleChange}
              className={`input-field ${errors.title ? 'error' : ''}`}
              placeholder="Enter your project title"
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Brief Description *</label>
            <input
              type="text"
              name="briefDescription"
              value={idea.briefDescription}
              onChange={handleChange}
              className={`input-field ${errors.briefDescription ? 'error' : ''}`}
              placeholder="A one-line summary of your idea"
            />
            {errors.briefDescription && <span className="error-text">{errors.briefDescription}</span>}
          </div>

          <div className="form-group">
            <label>Full Description *</label>
            <textarea
              name="description"
              value={idea.description}
              onChange={handleChange}
              rows="5"
              className={`input-field ${errors.description ? 'error' : ''}`}
              placeholder="Provide a detailed description of your project, including the problem it solves, your solution, and target market"
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>
        </div>

        {/* Funding Requirements */}
        <div className="form-section">
          <h3>Funding Requirements</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Funding Amount ($) *</label>
              <input
                type="number"
                name="fundingAmount"
                value={idea.fundingAmount}
                onChange={handleChange}
                className={`input-field ${errors.fundingAmount ? 'error' : ''}`}
                placeholder="0"
                min="1"
              />
              {errors.fundingAmount && <span className="error-text">{errors.fundingAmount}</span>}
            </div>

            <div className="form-group">
              <label>Equity Stake (%) *</label>
              <input
                type="number"
                name="equityStake"
                value={idea.equityStake}
                onChange={handleChange}
                className={`input-field ${errors.equityStake ? 'error' : ''}`}
                placeholder="0"
                min="1"
                max="100"
              />
              {errors.equityStake && <span className="error-text">{errors.equityStake}</span>}
            </div>
          </div>
        </div>

        {/* Media Upload */}
        <div className="form-section">
          <h3>Media & Documents</h3>
          
          {/* Image Upload */}
          <div className="form-group">
            <label>Project Image</label>
            {!idea.image ? (
              <DropZone type="image" accept="image/*" className="image-dropzone">
                <Upload size={24} />
                <p>Drag & drop an image here, or click to select</p>
                <small>Max size: 10MB</small>
              </DropZone>
            ) : (
              <FilePreview file={idea.image} type="image" onRemove={removeFile} />
            )}
            {errors.image && <span className="error-text">{errors.image}</span>}
          </div>

          {/* Short Video Upload */}
          <div className="form-group">
            <label>Short Pitch Video (1 minute max)</label>
            {!idea.shortVideo ? (
              <DropZone type="shortVideo" accept="video/*" className="video-dropzone">
                <Video size={24} />
                <p>Drag & drop your short pitch video here</p>
                <small>Max: 1 minute, 50MB</small>
              </DropZone>
            ) : (
              <FilePreview file={idea.shortVideo} type="shortVideo" onRemove={removeFile} />
            )}
            {errors.shortVideo && <span className="error-text">{errors.shortVideo}</span>}
          </div>

          {/* Long Video Upload */}
          <div className="form-group">
            <label>Detailed Presentation Video (30 minutes max)</label>
            {!idea.longVideo ? (
              <DropZone type="longVideo" accept="video/*" className="video-dropzone">
                <Video size={24} />
                <p>Drag & drop your detailed presentation here</p>
                <small>Max: 30 minutes, 200MB</small>
              </DropZone>
            ) : (
              <FilePreview file={idea.longVideo} type="longVideo" onRemove={removeFile} />
            )}
            {errors.longVideo && <span className="error-text">{errors.longVideo}</span>}
          </div>

          {/* Additional Documents */}
          <div className="form-group">
            <label>Additional Documents</label>
            <DropZone type="documents" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" className="docs-dropzone">
              <FileText size={24} />
              <p>Upload business plans, financial projections, etc.</p>
              <small>PDF, Word, Excel, PowerPoint files</small>
            </DropZone>
            
            {idea.additionalDocuments.length > 0 && (
              <div className="documents-list">
                {idea.additionalDocuments.map((doc, index) => (
                  <FilePreview 
                    key={index} 
                    file={doc} 
                    type="documents" 
                    onRemove={removeFile} 
                    index={index} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button onClick={(e) => { e.preventDefault(); setShowPreview(true); }} className="btn-primary preview-btn">
            <Eye size={16} />
            Preview Pitch
          </button>
        </div>
      </div>

      {showPreview && <PreviewModal />}

      <style jsx>{`
        .pitch-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .pitch-header {
          text-align: center;
          margin-bottom: 2rem;
          color: white;
        }

        .pitch-header h2 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .pitch-header p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .pitch-form {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .form-section {
          margin-bottom: 2.5rem;
        }

        .form-section h3 {
          color: #2d3748;
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #374151;
        }

        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f9fafb;
        }

        .input-field:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .input-field.error {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .drop-zone {
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #f9fafb;
        }

        .drop-zone:hover, .drop-zone.drag-over {
          border-color: #667eea;
          background: #f0f4ff;
          transform: translateY(-2px);
        }

        .drop-zone svg {
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .drop-zone p {
          color: #374151;
          margin-bottom: 0.25rem;
          font-weight: 500;
        }

        .drop-zone small {
          color: #6b7280;
        }

        .file-preview {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background: #f0f4ff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-top: 0.5rem;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .file-icon {
          color: #667eea;
        }

        .file-details {
          display: flex;
          flex-direction: column;
        }

        .file-name {
          font-weight: 500;
          color: #374151;
        }

        .file-size {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .remove-file-btn {
          background: #fee2e2;
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #dc2626;
          transition: background-color 0.2s;
        }

        .remove-file-btn:hover {
          background: #fecaca;
        }

        .documents-list {
          margin-top: 1rem;
          space-y: 0.5rem;
        }

        .error-text {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: block;
        }

        .form-actions {
          text-align: center;
          margin-top: 2rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .preview-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .preview-content {
          background: white;
          border-radius: 16px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .preview-header h3 {
          margin: 0;
          color: #1f2937;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          padding: 0.25rem;
        }

        .preview-body {
          padding: 1.5rem;
        }

        .preview-section h4 {
          color: #1f2937;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }

        .brief-desc {
          color: #6b7280;
          font-style: italic;
          margin-bottom: 1rem;
        }

        .preview-image {
          max-width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .description-preview, .video-preview {
          margin: 1.5rem 0;
        }

        .description-preview h5, .video-preview h5 {
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .funding-preview {
          display: flex;
          gap: 1rem;
          margin: 1rem 0;
          padding: 1rem;
          background: #f0f4ff;
          border-radius: 8px;
        }

        .funding-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #374151;
          font-weight: 500;
        }

        .preview-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding: 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        @media (max-width: 768px) {
          .pitch-container {
            padding: 1rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .funding-preview {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Pitch;